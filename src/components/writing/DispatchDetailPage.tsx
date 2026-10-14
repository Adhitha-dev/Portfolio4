import React, { useState, useEffect } from 'react';
import { DISPATCH_ITEMS } from './WritingDispatches';
import { WritingFooter } from './WritingFooter';

interface DispatchDetailPageProps {
  dispatchId?: string;
  onReturnWriting: () => void;
  onSelectDispatch: (dispatchId: string) => void;
  onOpenConnect: () => void;
}

export const DispatchDetailPage: React.FC<DispatchDetailPageProps> = ({
  dispatchId = 'dispatch-01',
  onReturnWriting,
  onSelectDispatch,
  onOpenConnect,
}) => {
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('section-01');
  const [readProgress, setReadProgress] = useState(0);

  // Find the selected dispatch or fallback to the first
  const currentDispatch =
    DISPATCH_ITEMS.find((item) => item.id === dispatchId) || DISPATCH_ITEMS[0];
  const currentIndex = DISPATCH_ITEMS.findIndex((item) => item.id === currentDispatch.id);
  const prevDispatch =
    DISPATCH_ITEMS[(currentIndex - 1 + DISPATCH_ITEMS.length) % DISPATCH_ITEMS.length];
  const nextDispatch = DISPATCH_ITEMS[(currentIndex + 1) % DISPATCH_ITEMS.length];

  // Reading progress and active TOC section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress =
        scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;
      setReadProgress(progress);

      const sectionIds = ['section-01', 'section-02', 'section-03', 'section-04', 'section-05'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSectionId(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyCode = async () => {
    const codeSnippet = `#include <linux/bpf.h>
#include <bpf/bpf_helpers.h>
#include <linux/if_ether.h>

// Bind userspace AF_XDP socket descriptors index
struct {
    __uint(type, BPF_MAP_TYPE_XSKMAP);
    __uint(max_entries, 64);
    __type(key, __u32);
    __type(value, __u32);
} xsks_map SEC(".maps");

SEC("xdp")
int xdp_zerocopy_router(struct xdp_md *ctx) {
    void *data = (void *)(long)ctx->data;
    void *data_end = (void *)(long)ctx->data_end;
    
    // Verifier boundary guarantee
    if (data + sizeof(struct ethhdr) > data_end)
        return XDP_PASS;
        
    __u32 rx_queue_id = ctx->rx_queue_index;
    
    // Zero-copy routing to registered userspace queue ring
    return bpf_redirect_map(&xsks_map, rx_queue_id, XDP_PASS);
}
char _license[] SEC("license") = "GPL";`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeSnippet);
      }
      setCopyCodeSuccess(true);
      setTimeout(() => setCopyCodeSuccess(false), 2400);
    } catch {
      setCopyCodeSuccess(true);
      setTimeout(() => setCopyCodeSuccess(false), 2400);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#040406] font-body text-white/70 antialiased min-h-screen flex flex-col selection:bg-white/10 selection:text-white relative overflow-x-hidden">
      {/* Vast Ambient Celestial Background */}
      <div className="fixed inset-0 pointer-events-none z-0 cosmic-grain opacity-60" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(255,255,255,0.035),transparent_75%)]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_85%_65%,rgba(20,20,28,0.4),transparent_60%)]" />

      {/* Faint Cosmic Orbit Rings in Deep Background */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] pointer-events-none z-[1] opacity-25">
        <svg className="w-full h-full orbit-slow" fill="none" viewBox="0 0 1000 1000">
          <circle cx="500" cy="500" r="480" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 12" strokeWidth="1" />
          <circle cx="500" cy="500" r="360" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
          <circle cx="500" cy="500" r="220" stroke="rgba(255,255,255,0.05)" strokeDasharray="6 24" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Main Editorial Stage */}
      <main className="w-full flex-1 pt-24 md:pt-36 pb-36 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col w-full text-zinc-300 font-sans selection:bg-rose-500/20 selection:text-white relative">
          
          {/* Subtle Spatial Vignette Glow */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-radial from-rose-950/20 via-zinc-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* BREADCRUMB & ORBIT TELEMETRY STRIP */}
          <header className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-800/80">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onReturnWriting}
                className="group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-400 hover:text-white transition-all text-xs font-mono tracking-wider cursor-pointer"
              >
                <span className="text-rose-500 text-[10px] group-hover:-translate-x-0.5 transition-transform">←</span>
                <span>RETURN TO DISPATCH REGISTRY</span>
                <span className="text-zinc-600">//</span>
                <span className="text-rose-400/90 font-medium">VOL. 05</span>
              </button>
            </div>

            {/* Telemetry Ticker Badges */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-400">
              <div className="px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2">
                <span className="text-zinc-500 text-[9px] uppercase tracking-wider">SYS.ID</span>
                <span className="text-zinc-200">{currentDispatch.episode.split('//')[0].trim()}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2">
                <span className="text-zinc-500 text-[9px] uppercase tracking-wider">TARGET</span>
                <span className="text-zinc-300">{currentDispatch.targetOrScheme.replace('TARGET:', '').trim()}</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2">
                <span className="text-zinc-500 text-[9px] uppercase tracking-wider">ATTEST</span>
                <span className="text-zinc-300 font-mono tracking-tight">{currentDispatch.attestationOrMetric.replace('ATTESTATION:', '').trim()}</span>
              </div>
            </div>
          </header>

          {/* TITLE & HERO ABSTRACT REGION */}
          <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-14">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10.5px] sm:text-xs font-mono tracking-widest text-zinc-500 uppercase">
              <span className="text-zinc-300 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
                DISPATCH // {currentDispatch.orbit}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">EPOCH: {currentDispatch.date.split('·')[0].trim()}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">READ: {currentDispatch.date.split('·')[1]?.trim() || '~14 MIN'}</span>
            </div>

            <h1
              className="font-giant text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-[0.03em] sm:tracking-tight font-normal max-w-4xl leading-[1.32] sm:leading-[1.28] md:leading-[1.26] lg:leading-[1.24] mb-3 sm:mb-4"
              style={{ lineHeight: '1.28' }}
            >
              {currentDispatch.title}
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl font-sans">
              {currentDispatch.excerpt}
            </p>

            {/* Author & Cryptographic Attestation Block */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-zinc-800/60 text-[10px] sm:text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-300 text-[10px] sm:text-xs">
                  AR
                </div>
                <div>
                  <div className="text-zinc-200 font-medium tracking-wide text-[10px] sm:text-xs">ADITHYA K. RAO // PRINCIPAL SYSTEMS ARCHITECT</div>
                  <div className="text-zinc-500 text-[9.5px] sm:text-[11px]">KERNEL &amp; HIGH-THROUGHPUT RUNTIMES</div>
                </div>
              </div>
              <div className="text-zinc-500 text-[9.5px] sm:text-[11px] font-mono">PGP: ED25519 [ 9C04 E28A ]</div>
            </div>
          </div>

          {/* CORE GRID: 12-COLUMN DUAL RAIL ARCHITECTURE */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-14 items-start w-full">
            
            {/* MOBILE/TABLET COMPACT TOC & TELEMETRY INDEX (Visible on screens < lg) */}
            <aside className="w-full block lg:hidden">
              <div className="p-4 sm:p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3 sm:space-y-4 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider pb-2.5 sm:pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
                    <span>INDEX</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 text-[9px] sm:text-[10px]">
                    VOL. 05
                  </span>
                </div>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono">
                  {[
                    { id: 'section-01', num: '01', title: 'MEMORY SATURATION' },
                    { id: 'section-02', num: '02', title: 'XDP INGRESS HOOKS' },
                    { id: 'section-03', num: '03', title: 'RING CONCURRENCY' },
                    { id: 'section-04', num: '04', title: 'BENCHMARK HARMONICS' },
                    { id: 'section-05', num: '05', title: 'KERNEL SYNTHESIS' },
                  ].map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`toc-link block px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border transition-all ${
                        activeSectionId === sec.id
                          ? 'border-white/30 bg-zinc-800/80 text-white font-medium'
                          : 'border-zinc-800/60 bg-zinc-900/40 text-zinc-300 hover:text-white hover:bg-zinc-800/80'
                      }`}
                    >
                      <span className="text-zinc-500 mr-2">{sec.num}</span>
                      {sec.title}
                    </a>
                  ))}
                </nav>
                <div className="pt-2.5 sm:pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[9.5px] sm:text-[11px] font-mono text-zinc-400">
                  <span>SPEC: <span className="text-zinc-200">AF_XDP / LINUX 6.9</span></span>
                  <span className="text-zinc-500">OFFSET RANGE: 0x000 - 0x620</span>
                </div>
              </div>
            </aside>

            {/* LEFT COLUMN: MAIN EDITORIAL & TECHNICAL DEEP DIVE (8 COLS on LG) */}
            <article className="w-full lg:col-span-8 space-y-10 sm:space-y-12 leading-relaxed text-zinc-300 font-normal">
              
              {/* SECTION 01 */}
              <section className="space-y-4 sm:space-y-5 scroll-mt-28" id="section-01">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-wider text-rose-500 uppercase">
                  <span className="text-zinc-400 font-medium">01 // INCIDENT VECTORS</span>
                  <div className="h-px flex-1 bg-zinc-800/80" />
                  <span className="text-zinc-600">OFFSET 0x000</span>
                </div>
                <h2
                  className="font-giant text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal mb-2 sm:mb-3"
                  style={{ lineHeight: '1.32' }}
                >
                  The Memory Saturation Paradox
                </h2>
                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  At line rates exceeding 40 Gbps, the classic POSIX socket abstraction (<code className="text-rose-300 font-mono text-[11px] sm:text-sm px-1.5 py-0.5 rounded-sm bg-zinc-900">recvmsg()</code> / <code className="text-rose-300 font-mono text-[11px] sm:text-sm px-1.5 py-0.5 rounded-sm bg-zinc-900">epoll</code>) ceases to behave deterministically. The Linux network stack allocates a <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">sk_buff</code> structure for every single incoming packet frame. Under high packet density (such as 64-byte telemetry frames arriving at 28.4 Mpps), the CPU spends over <span className="text-rose-400 font-medium">68.4% of total execution cycles</span> exclusively inside <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">kmem_cache_alloc_node</code>, TLB shootdowns, and cache line invalidations across NUMA nodes.
                </p>

                {/* Technical Callout Strip */}
                <aside className="relative p-4 sm:p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-2 backdrop-blur-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-zinc-400 tracking-wider uppercase">
                    <span>/// ARCHITECTURAL AXIOM // ZERO ALLOCATION RULE</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-800/70 text-zinc-400 text-[9px] sm:text-[10px]">
                      P99.99 &lt; 850ns
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-sm font-mono text-zinc-300 leading-normal">
                    “Memory allocation on the hot path is fundamentally a design concession. If an ingress telemetry pipeline invokes a memory allocator while servicing a descriptor ring, deterministic microsecond SLAs are mathematically unachievable.”
                  </p>
                </aside>

                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  The solution lies in decoupling the packet descriptor lifecycle from kernel memory allocations. By provisioning contiguous Userspace Memory (<code className="text-zinc-200 font-mono text-[11px] sm:text-sm">UMEM</code>) chunk pages upfront and mapping them directly to the Network Interface Controller (NIC) hardware DMA registers, incoming packet data lands directly in userspace addressable memory with zero kernel intermediate copies.
                </p>
              </section>

              {/* ARCHITECTURE SVG DIAGRAM COMPONENT */}
              <section className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] sm:text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  <span>FIG 1.0 // AF_XDP ZERO-COPY UMEM PACKET INGRESS PIPELINE</span>
                  <span className="text-zinc-400">DIRECT NIC-TO-RING BUS</span>
                </div>
                <div className="p-3.5 sm:p-6 md:p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 overflow-x-auto custom-scrollbar max-w-full shadow-lg backdrop-blur-sm">
                  <div className="min-w-[560px]">
                    <svg className="w-full h-auto text-zinc-400" fill="none" viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg">
                      <line stroke="#27272a" strokeDasharray="2 6" x1="20" x2="740" y1="40" y2="40" />
                      <line stroke="#27272a" strokeDasharray="2 6" x1="20" x2="740" y1="110" y2="110" />
                      <line stroke="#27272a" strokeDasharray="2 6" x1="20" x2="740" y1="180" y2="180" />
                      
                      {/* NIC Hardware Block */}
                      <rect fill="#0d0d10" height="100" rx="8" stroke="#3f3f46" strokeWidth="1" width="140" x="25" y="60" />
                      <text fill="#e4e4e7" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="95" y="95">NIC HARDWARE</text>
                      <text fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle" x="95" y="115">100GbE QSFP28</text>
                      <rect fill="#18181b" height="22" rx="11" stroke="#27272a" width="110" x="40" y="126" />
                      <text fill="#a1a1aa" fontFamily="monospace" fontSize="9" textAnchor="middle" x="95" y="141">RX DMA RING</text>
                      
                      <path d="M165 110 H235" stroke="#52525b" strokeWidth="1.5" />
                      <polygon fill="#71717a" points="233,107 240,110 233,113" />
                      
                      {/* eBPF Driver Block */}
                      <rect fill="#0d0d10" height="100" rx="8" stroke="#52525b" strokeWidth="1" width="160" x="245" y="60" />
                      <text fill="#ffffff" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="325" y="95">eBPF XDP DRIVER</text>
                      <text fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle" x="325" y="115">SEC("xdp") FILTER</text>
                      <rect fill="#18181b" height="22" rx="11" stroke="#27272a" width="130" x="260" y="126" />
                      <text fill="#d4d4d8" fontFamily="monospace" fontSize="9" textAnchor="middle" x="325" y="141">XDP_REDIRECT</text>
                      
                      <path d="M405 110 H475" stroke="#52525b" strokeWidth="1.5" />
                      <polygon fill="#71717a" points="473,107 480,110 473,113" />
                      
                      {/* Userspace UMEM Block */}
                      <rect fill="#0d0d10" height="140" rx="8" stroke="#3f3f46" strokeWidth="1" width="245" x="485" y="40" />
                      <text fill="#e4e4e7" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="607" y="68">USERSPACE UMEM REGION</text>
                      <text fill="#71717a" fontFamily="monospace" fontSize="10" textAnchor="middle" x="607" y="86">mmap() PINNED HUGEPAGES</text>
                      <rect fill="#18181b" height="30" rx="15" stroke="#27272a" strokeWidth="1" width="205" x="505" y="98" />
                      <text fill="#d4d4d8" fontFamily="monospace" fontSize="9" fontWeight="500" textAnchor="middle" x="607" y="117">FILL &amp; COMPLETION RINGS</text>
                      <rect fill="#18181b" height="30" rx="15" stroke="#27272a" strokeWidth="1" width="205" x="505" y="136" />
                      <text fill="#a1a1aa" fontFamily="monospace" fontSize="9" fontWeight="500" textAnchor="middle" x="607" y="155">RX / TX DESCRIPTORS</text>
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-500 leading-normal">
                  ▲ Ingress packet headers are evaluated in-NIC or at the driver level before touching host memory subsystem.
                </p>
              </section>

              {/* SECTION 02 */}
              <section className="space-y-4 sm:space-y-5 scroll-mt-28" id="section-02">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-wider text-rose-500 uppercase">
                  <span className="text-zinc-400 font-medium">02 // eBPF IMPLEMENTATION</span>
                  <div className="h-px flex-1 bg-zinc-800/80" />
                  <span className="text-zinc-600">OFFSET 0x180</span>
                </div>
                <h2
                  className="font-giant text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal mb-2 sm:mb-3"
                  style={{ lineHeight: '1.32' }}
                >
                  XDP Ingress Hooks &amp; BPF Maps
                </h2>
                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  The core eBPF kernel program operates directly inside the native device driver before the kernel allocates any <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">sk_buff</code>. Below is the optimized C program compiling targeting Linux 6.8+ utilizing BPF CO-RE (Compile Once – Run Everywhere) conventions with zero-copy redirection through <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">BPF_MAP_TYPE_XSKMAP</code>:
                </p>

                {/* CODE BLOCK CONTAINER */}
                <div className="rounded-2xl bg-zinc-950/90 border border-zinc-800/80 overflow-hidden font-mono text-[10px] sm:text-xs shadow-lg max-w-full">
                  <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 bg-zinc-900/90 border-b border-zinc-800/70 flex items-center justify-between text-zinc-400 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-zinc-500" />
                      <span className="text-zinc-200 font-medium tracking-wide text-[10px] sm:text-xs">xdp_filter.bpf.c</span>
                      <span className="text-zinc-600">|</span>
                      <span className="text-zinc-500 text-[9.5px] sm:text-[11px]">CLANG-18 / BPF_TARGET</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2.5 sm:px-3 py-1 rounded-full border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/90 text-zinc-400 hover:text-white transition-all flex items-center gap-1 text-[9px] sm:text-[10px] tracking-wider uppercase cursor-pointer"
                      id="copy-code-btn"
                    >
                      {copyCodeSuccess ? 'COPIED' : 'COPY SOURCE'}
                    </button>
                  </div>
                  <pre className="p-3.5 sm:p-5 overflow-x-auto custom-scrollbar max-w-full text-zinc-300 leading-relaxed text-[10.5px] sm:text-xs">
                    <code className="grid grid-cols-[1.75rem_1fr] sm:grid-cols-[2rem_1fr] gap-3 sm:gap-4 min-w-[480px]">
                      <span className="text-zinc-600 select-none text-right">01</span><span><span className="text-purple-400">#include</span> <span className="text-amber-300">&lt;linux/bpf.h&gt;</span></span>
                      <span className="text-zinc-600 select-none text-right">02</span><span><span className="text-purple-400">#include</span> <span className="text-amber-300">&lt;bpf/bpf_helpers.h&gt;</span></span>
                      <span className="text-zinc-600 select-none text-right">03</span><span><span className="text-purple-400">#include</span> <span className="text-amber-300">&lt;linux/if_ether.h&gt;</span></span>
                      <span className="text-zinc-600 select-none text-right">04</span><span />
                      <span className="text-zinc-600 select-none text-right">05</span><span><span className="text-zinc-500">// Bind userspace AF_XDP socket descriptors index</span></span>
                      <span className="text-zinc-600 select-none text-right">06</span><span><span className="text-blue-400">struct</span> &#123;</span>
                      <span className="text-zinc-600 select-none text-right">07</span><span>    __uint(type, BPF_MAP_TYPE_XSKMAP);</span>
                      <span className="text-zinc-600 select-none text-right">08</span><span>    __uint(max_entries, 64);</span>
                      <span className="text-zinc-600 select-none text-right">09</span><span>    __type(key, __u32);</span>
                      <span className="text-zinc-600 select-none text-right">10</span><span>    __type(value, __u32);</span>
                      <span className="text-zinc-600 select-none text-right">11</span><span>&#125; xsks_map <span className="text-rose-400">SEC</span>(<span className="text-amber-300">".maps"</span>);</span>
                      <span className="text-zinc-600 select-none text-right">12</span><span />
                      <span className="text-zinc-600 select-none text-right">13</span><span><span className="text-rose-400">SEC</span>(<span className="text-amber-300">"xdp"</span>)</span>
                      <span className="text-zinc-600 select-none text-right">14</span><span><span className="text-blue-400">int</span> <span className="text-emerald-400">xdp_zerocopy_router</span>(<span className="text-blue-400">struct</span> xdp_md *ctx) &#123;</span>
                      <span className="text-zinc-600 select-none text-right">15</span><span>    <span className="text-blue-400">void</span> *data = (<span className="text-blue-400">void</span> *)(<span className="text-blue-400">long</span>)ctx-&gt;data;</span>
                      <span className="text-zinc-600 select-none text-right">16</span><span>    <span className="text-blue-400">void</span> *data_end = (<span className="text-blue-400">void</span> *)(<span className="text-blue-400">long</span>)ctx-&gt;data_end;</span>
                      <span className="text-zinc-600 select-none text-right">17</span><span />
                      <span className="text-zinc-600 select-none text-right">18</span><span>    <span className="text-zinc-500">// Verifier boundary guarantee</span></span>
                      <span className="text-zinc-600 select-none text-right">19</span><span>    <span className="text-purple-400">if</span> (data + <span className="text-blue-400">sizeof</span>(<span className="text-blue-400">struct</span> ethhdr) &gt; data_end)</span>
                      <span className="text-zinc-600 select-none text-right">20</span><span>        <span className="text-purple-400">return</span> XDP_PASS;</span>
                      <span className="text-zinc-600 select-none text-right">21</span><span />
                      <span className="text-zinc-600 select-none text-right">22</span><span>    __u32 rx_queue_id = ctx-&gt;rx_queue_index;</span>
                      <span className="text-zinc-600 select-none text-right">23</span><span />
                      <span className="text-zinc-600 select-none text-right">24</span><span>    <span className="text-zinc-500">// Zero-copy routing to registered userspace queue ring</span></span>
                      <span className="text-zinc-600 select-none text-right">25</span><span>    <span className="text-purple-400">return</span> bpf_redirect_map(&amp;xsks_map, rx_queue_id, XDP_PASS);</span>
                      <span className="text-zinc-600 select-none text-right">26</span><span>&#125;</span>
                      <span className="text-zinc-600 select-none text-right">27</span><span><span className="text-blue-400">char</span> _license[] <span className="text-rose-400">SEC</span>(<span className="text-amber-300">"license"</span>) = <span className="text-amber-300">"GPL"</span>;</span>
                    </code>
                  </pre>
                </div>
              </section>

              {/* SECTION 03 */}
              <section className="space-y-4 sm:space-y-5 scroll-mt-28" id="section-03">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-wider text-rose-500 uppercase">
                  <span className="text-zinc-400 font-medium">03 // CONCURRENCY PRIMITIVES</span>
                  <div className="h-px flex-1 bg-zinc-800/80" />
                  <span className="text-zinc-600">OFFSET 0x320</span>
                </div>
                <h2
                  className="font-giant text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal mb-2 sm:mb-3"
                  style={{ lineHeight: '1.32' }}
                >
                  Ring Buffer Concurrency &amp; Memory Fences
                </h2>
                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  Because userspace and kernel spaces share the ring buffer simultaneously without locks or mutices, synchronization depends entirely on memory ordering semantics. The producer updates the <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">producer</code> cursor with an atomic store using <code className="text-rose-300 font-mono text-[11px] sm:text-sm">Release</code> ordering, while the consumer consumes using <code className="text-rose-300 font-mono text-[11px] sm:text-sm">Acquire</code> ordering.
                </p>
                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  On x86-64 hardware architectures, hardware memory reads and writes are already strongly ordered (TSO - Total Store Order). However, compiling across ARM64 (Neoverse-N2 cores) requires explicit <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">dmb ishld</code> (Data Memory Barrier) instructions to prevent out-of-order execution from reading invalid packet payload bytes before descriptor metadata arrives.
                </p>

                {/* Benchmark Table Component */}
                <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[9.5px] sm:text-xs font-mono text-zinc-500 uppercase">
                    <span>BENCHMARK HARMONICS // INGRESS PIPELINE STRESS TEST</span>
                    <span className="text-zinc-400">TESTBED: 2x AMD EPYC 9654</span>
                  </div>
                  <div className="overflow-x-auto custom-scrollbar max-w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/70 shadow-lg">
                    <table className="w-full text-left text-[9.5px] sm:text-xs font-mono min-w-[560px]">
                      <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800">
                        <tr>
                          <th className="py-3 px-3.5 sm:py-3.5 sm:px-5">INGRESS METHOD</th>
                          <th className="py-3 px-2.5 sm:py-3.5 sm:px-3">P50 LATENCY</th>
                          <th className="py-3 px-2.5 sm:py-3.5 sm:px-3">P99 LATENCY</th>
                          <th className="py-3 px-2.5 sm:py-3.5 sm:px-3">P99.99 TAIL</th>
                          <th className="py-3 px-2.5 sm:py-3.5 sm:px-3">CPU / PKT</th>
                          <th className="py-3 px-3.5 sm:py-3.5 sm:px-5">ALLOCS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                        <tr className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 font-normal text-zinc-300">POSIX recvmsg()</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">2,840 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">8,920 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">41200 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">412 cyc</td>
                          <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 text-zinc-400">1 per pkt</td>
                        </tr>
                        <tr className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 font-normal text-zinc-300">io_uring SQPOLL</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">1,120 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">2,410 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">8,750 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-zinc-400">184 cyc</td>
                          <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 text-zinc-400">0 (Fixed)</td>
                        </tr>
                        <tr className="bg-zinc-900/40 transition-colors font-medium text-white">
                          <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
                            AF_XDP (Zero-Copy)
                          </td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-white">280 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-white">620 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-white">840 ns</td>
                          <td className="py-3 px-2.5 sm:py-3.5 sm:px-3 text-white">42 cyc</td>
                          <td className="py-3 px-3.5 sm:py-3.5 sm:px-5 text-white">0 (UMEM)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-[9.5px] sm:text-[11px] font-mono text-zinc-500">
                    * Benchmark measured with 64-byte UDP frame bursts at 40 Mpps utilizing Mellanox ConnectX-6 Dx hardware bypass driver.
                  </div>
                </div>
              </section>

              {/* SECTION 04 */}
              <section className="space-y-4 sm:space-y-5 scroll-mt-28" id="section-04">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-wider text-rose-500 uppercase">
                  <span className="text-zinc-400 font-medium">04 // HARMONIC PROFILING</span>
                  <div className="h-px flex-1 bg-zinc-800/80" />
                  <span className="text-zinc-600">OFFSET 0x480</span>
                </div>
                <h2
                  className="font-giant text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal mb-2 sm:mb-3"
                  style={{ lineHeight: '1.32' }}
                >
                  Zero-Copy Benchmark Harmonics
                </h2>
                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  Throughput scaling is notably linear with queue pin partitioning. Binding one userspace consumer worker thread to each dedicated physical hardware RX queue (CPU core pinning via <code className="text-zinc-200 font-mono text-[11px] sm:text-sm">pthread_setaffinity_np</code>) totally eliminates cross-core cache invalidation interrupts:
                </p>

                {/* Inline Visual Progress Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2 sm:space-y-2.5 backdrop-blur-sm">
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase">CORE 01 // INGRESS</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white">14.28 <span className="text-[10px] sm:text-xs text-zinc-400">Mpps</span></div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-zinc-300 h-full w-[94%]" />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400">Utilization: 94.2%</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2 sm:space-y-2.5 backdrop-blur-sm">
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase">CORE 02 // INGRESS</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white">14.19 <span className="text-[10px] sm:text-xs text-zinc-400">Mpps</span></div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-zinc-300 h-full w-[93%]" />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400">Utilization: 93.6%</div>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2 sm:space-y-2.5 backdrop-blur-sm md:col-span-2 lg:col-span-1">
                    <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase">SYSTEM L3 HIT RATE</div>
                    <div className="text-lg sm:text-2xl font-bold font-mono text-white">99.82 <span className="text-[10px] sm:text-xs text-zinc-400">%</span></div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-zinc-300 h-full w-[99%]" />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400">NUMA Misses: 0.00%</div>
                  </div>
                </div>
              </section>

              {/* SECTION 05 */}
              <section className="space-y-4 sm:space-y-5 scroll-mt-28" id="section-05">
                <div className="flex items-center gap-3 text-[10px] sm:text-xs font-mono tracking-wider text-rose-500 uppercase">
                  <span className="text-zinc-400 font-medium">05 // KERNEL SYNTHESIS</span>
                  <div className="h-px flex-1 bg-zinc-800/80" />
                  <span className="text-zinc-600">OFFSET 0x620</span>
                </div>
                <h2
                  className="font-giant text-lg sm:text-2xl md:text-3xl text-white uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal mb-2 sm:mb-3"
                  style={{ lineHeight: '1.32' }}
                >
                  Summary &amp; Upstream Patches
                </h2>
                <p className="text-[12px] sm:text-[15px] md:text-base text-zinc-300/90 leading-relaxed font-body">
                  Zero-copy architecture through eBPF/XDP transitions low-latency telemetry from unpredictable operating-system scheduling towards deterministic hardware-interfaced mechanics. When architecting telemetry sinks for planetary clusters, memory management must be treated as a zero-allocation contract.
                </p>

                {/* Upstream Patch Matrix Badges */}
                <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3 sm:space-y-4 font-mono text-[10.5px] sm:text-xs backdrop-blur-sm">
                  <div className="text-zinc-500 tracking-wider text-[10px] sm:text-[11px] uppercase flex items-center justify-between">
                    <span>UPSTREAM KERNEL COMMIT ATTESTATION</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[9.5px] sm:text-[10px] text-zinc-400">
                      MAINLINE
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 sm:py-2 border-b border-zinc-800/50">
                      <span className="text-zinc-300 font-mono">commit 9c4f1082a4d3</span>
                      <span className="text-zinc-400">bpf: xsk: Add multi-buffer support for AF_XDP ZC</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-800/70 text-zinc-400 text-[9.5px] sm:text-[10px] inline-block w-fit">
                        MERGED // v6.9
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 sm:py-2">
                      <span className="text-zinc-300 font-mono">commit 72b109e99c31</span>
                      <span className="text-zinc-400">net: mlx5: Implement zero-copy RX ring batch reclamation</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-800/70 text-zinc-400 text-[9.5px] sm:text-[10px] inline-block w-fit">
                        MERGED // v6.8
                      </span>
                    </div>
                  </div>
                </div>
              </section>

            </article>

            {/* RIGHT COLUMN: DESKTOP STICKY TELEMETRY RAIL & DOSSIER (4 COLS on LG) */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 space-y-6 w-full">
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-6 backdrop-blur-md shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 uppercase tracking-widest pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c]" />
                    <span>INDEX</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-zinc-400 text-[10px]">
                    VOL. 05
                  </span>
                </div>

                <nav className="space-y-1.5 text-xs font-mono" id="table-of-contents">
                  {[
                    { id: 'section-01', num: '01', title: 'MEMORY SATURATION' },
                    { id: 'section-02', num: '02', title: 'XDP INGRESS HOOKS' },
                    { id: 'section-03', num: '03', title: 'RING CONCURRENCY' },
                    { id: 'section-04', num: '04', title: 'BENCHMARK HARMONICS' },
                    { id: 'section-05', num: '05', title: 'KERNEL SYNTHESIS' },
                  ].map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`toc-link block px-3 py-2 rounded-full transition-all ${
                        activeSectionId === sec.id
                          ? 'text-white bg-zinc-800/70 font-medium'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                      }`}
                    >
                      <span className="text-zinc-600 mr-2">{sec.num}</span>
                      {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-zinc-800 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between text-zinc-500">
                    <span>BUFFER READ</span>
                    <span className="text-zinc-300 font-mono" id="read-progress-percent">
                      {readProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-zinc-200 h-full transition-all duration-150"
                      id="read-progress-bar"
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60">
                  <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
                    <span>SPEC</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-800/70 text-zinc-300 text-[10px]">
                      AF_XDP / LINUX 6.9
                    </span>
                  </div>
                </div>
              </div>
            </aside>

          </div>

          {/* DISPATCH NAVIGATION: PREV / NEXT VECTOR CARDS */}
          <section className="mt-16 sm:mt-20 pt-8 sm:pt-12 border-t border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              
              {/* Previous Dispatch Card */}
              <button
                type="button"
                onClick={() => onSelectDispatch(prevDispatch.id)}
                className="group p-4 sm:p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 shadow-lg backdrop-blur-sm text-left cursor-pointer"
              >
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                  <span className="text-rose-500 group-hover:-translate-x-1 transition-transform">←</span>
                  <span>PREVIOUS DISPATCH // {prevDispatch.episode.split('//')[0].trim()}</span>
                </div>
                <div
                  className="font-giant text-xs sm:text-base md:text-lg text-white group-hover:text-rose-400 transition-colors uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal"
                  style={{ lineHeight: '1.35' }}
                >
                  {prevDispatch.title}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[9.5px] sm:text-xs font-mono text-zinc-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-950/60 border border-zinc-800/70 text-[9px] sm:text-[10px]">
                    {prevDispatch.category.toUpperCase()}
                  </span>
                  <span className="text-zinc-600">//</span>
                  <span>{prevDispatch.date.split('·')[1]?.trim() || '18 MIN READ'}</span>
                </div>
              </button>

              {/* Next Dispatch Card */}
              <button
                type="button"
                onClick={() => onSelectDispatch(nextDispatch.id)}
                className="group p-4 sm:p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3 sm:space-y-4 md:text-right shadow-lg backdrop-blur-sm text-left md:text-right cursor-pointer"
              >
                <div className="flex items-center md:justify-end gap-2 text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                  <span>NEXT DISPATCH // {nextDispatch.episode.split('//')[0].trim()}</span>
                  <span className="text-rose-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <div
                  className="font-giant text-xs sm:text-base md:text-lg text-white group-hover:text-rose-400 transition-colors uppercase tracking-[0.03em] sm:tracking-tight font-normal leading-snug sm:leading-normal"
                  style={{ lineHeight: '1.35' }}
                >
                  {nextDispatch.title}
                </div>
                <div className="flex flex-wrap items-center md:justify-end gap-2 text-[9.5px] sm:text-xs font-mono text-zinc-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-950/60 border border-zinc-800/70 text-[9px] sm:text-[10px]">
                    {nextDispatch.category.toUpperCase()}
                  </span>
                  <span className="text-zinc-600">//</span>
                  <span>{nextDispatch.date.split('·')[1]?.trim() || '12 MIN READ'}</span>
                </div>
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Retro-Minimal Synchronized Footer Bar (Standard Connect Footer) */}
      <WritingFooter onOpenConnect={onOpenConnect} />
    </div>
  );
};
