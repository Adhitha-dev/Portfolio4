import React from 'react';
import { WritingCategory, DispatchItem } from '../../types/writing';

interface WritingDispatchesProps {
  activeCategory: WritingCategory;
  onSelectDispatch?: (item: DispatchItem) => void;
}

export const DISPATCH_ITEMS: DispatchItem[] = [
  {
    id: 'dispatch-01',
    category: 'systems',
    orbit: 'ORBIT 0.41 AU // SYSTEMS',
    episode: 'EP-498 // SUB-MICROSECOND',
    date: '2024.11.18 · 14 MIN READ',
    title: 'Zero-Copy Memory Planes & Kernel eBPF Telemetry',
    excerpt:
      'Investigating ring buffer saturation under multi-gigabit ingress. How bypassing standard socket serialization via dedicated XDP primitives guarantees deterministic sub-microsecond latency boundaries across asynchronous cluster topologies.',
    targetOrScheme: 'TARGET: RUST / LINUX 6.9',
    attestationOrMetric: 'ATTESTATION: SHA-256 (0x7F2A)',
    glyph: 'systems',
    specs: [
      { label: 'KERNEL INGRESS', value: 'XDP / AF_XDP Driver Mode' },
      { label: 'RING BUFFER', value: '16,384 Slots Zero-Copy' },
      { label: 'LATENCY BOUNDARY', value: '0.38µs P99 Deterministic' },
      { label: 'MEM LOCK LIMIT', value: 'unlimited // CAP_BPF' },
    ],
    fullContent:
      'Standard socket interfaces impose severe context-switching overhead under multi-gigabit workloads. By implementing dedicated eBPF XDP programs operating directly at the network interface card driver level, packets are intercepted and placed into zero-copy UMEM memory regions before kernel socket buffers are allocated. This architecture eliminates userspace memory copies entirely, establishing verifiable sub-microsecond boundaries even under bursty denial conditions.',
  },
  {
    id: 'dispatch-02',
    category: 'consensus',
    orbit: 'ORBIT 0.44 AU // CONSENSUS',
    episode: 'EP-489 // STATE MACHINE',
    date: '2024.10.02 · 19 MIN READ',
    title: 'Deterministic Finality in Asynchronous Quorums',
    excerpt:
      'Formal verification breakdown of partial synchrony bounds. Mitigating split-brain threshold states during Byzantine adversary network partitioning using monotonic vector clocks and verifiable delay attestations.',
    targetOrScheme: 'CONSENSUS: BFT-PIPELINED',
    attestationOrMetric: 'LIVENESS GUARANTEE: > 99.999%',
    glyph: 'consensus',
    specs: [
      { label: 'PROTOCOL FAMILY', value: 'Chained HotStuff / Narwhal' },
      { label: 'FAULT TOLERANCE', value: 'f < n/3 Byzantine Resilient' },
      { label: 'FINALITY DEPTH', value: '2-Round Commit Rule' },
      { label: 'RECOVERY WINDOW', value: '< 450ms Partition Heal' },
    ],
    fullContent:
      'Asynchronous networks exhibit nondeterministic message arrivals that can induce split-brain conditions in distributed state machines. By introducing monotonically increasing cryptographic vector clocks tied to verifiable delay attestations, validator nodes establish a strict partial order of execution that guarantees safety without assuming synchronized physical clocks.',
  },
  {
    id: 'dispatch-03',
    category: 'crypto',
    orbit: 'ORBIT 0.48 AU // APPLIED CRYPTO',
    episode: 'EP-472 // ZK-ARITHMETIZATION',
    date: '2024.08.14 · 22 MIN READ',
    title: 'Plonkish Arithmetization & Polynomial Commitments',
    excerpt:
      'Deconstructing KZG evaluations over elliptic pairing curves (BN254). Circuit gate optimization patterns that reduce proof synthesis overhead by 42% on resource-constrained edge hardware accelerators.',
    targetOrScheme: 'SCHEME: PLONK / KZG10',
    attestationOrMetric: 'PROVING TIME: 1.48s',
    glyph: 'crypto',
    specs: [
      { label: 'ELLIPTIC CURVE', value: 'BN254 (alt_bn128)' },
      { label: 'POLYNOMIAL COMMIT', value: 'KZG10 Kate-Zaverucha-Goldberg' },
      { label: 'GATE OVERHEAD', value: '3 Wires + 2 Custom Selectors' },
      { label: 'SYNTHESIS ACCEL', value: 'AVX-512 & WebGPU MSM' },
    ],
    fullContent:
      'Plonkish arithmetization offers extreme flexibility in custom gate design compared to legacy R1CS formulations. In this dispatch, we analyze the synthesis of polynomial identities over elliptic curves, examining how multilinear extensions and quotient polynomial evaluations achieve a 42% decrease in synthesis latency on edge coprocessors.',
  },
  {
    id: 'dispatch-04',
    category: 'graphics',
    orbit: 'ORBIT 0.52 AU // GRAPHICS',
    episode: 'EP-461 // VOLUMETRIC WGSL',
    date: '2024.06.29 · 11 MIN READ',
    title: 'Volumetric Signed Distance Fields in WebGPU & WGSL',
    excerpt:
      'Real-time raymarched planetary atmospheric density matrices running at solid 120 FPS. Adaptive sphere tracing with temporal anti-aliasing jitter and compute shader light propagation tunnels.',
    targetOrScheme: 'API: WebGPU COMPUTE',
    attestationOrMetric: 'FRAME BUDGET: 8.33ms (120FPS)',
    glyph: 'graphics',
    specs: [
      { label: 'GRAPHICS API', value: 'WebGPU 1.0 (WGSL Compute)' },
      { label: 'RAYMARCH STEPS', value: '64 Fixed + Adaptive Horizon' },
      { label: 'REFRESH TARGET', value: '120Hz ProMotion Locked' },
      { label: 'LIGHT PROPAGATION', value: 'Volumetric Beer-Lambert SSS' },
    ],
    fullContent:
      'Volumetric raymarching of participating media historically required server-grade GPUs. By formulating the density matrix as an analytic signed distance field (SDF) evaluated inside WGSL compute pipelines with temporal reprojection jitter, we achieve photorealistic light scattering across millions of spatial samples in an 8.33 millisecond browser frame budget.',
  },
  {
    id: 'dispatch-05',
    category: 'systems',
    orbit: 'ORBIT 0.58 AU // SYSTEMS',
    episode: 'EP-447 // ISOLATION PRIMITIVES',
    date: '2024.04.10 · 16 MIN READ',
    title: 'Hardware-Enforced MicroVM Isolation with Firecracker',
    excerpt:
      'Sub-5ms tenant booting and minimal KVM footprint orchestration. Benchmarking hypervisor trap-and-emulate penalty against seccomp jail architectures under heavy burst multi-tenant IO workloads.',
    targetOrScheme: 'HYPERVISOR: KVM / FIRECRACKER',
    attestationOrMetric: 'COLD START: 4.8ms',
    glyph: 'systems-alt',
    specs: [
      { label: 'VIRTUALIZATION', value: 'Linux KVM / dev/kvm ioctl' },
      { label: 'BOOT FOOTPRINT', value: '< 5MB Base Memory Overhead' },
      { label: 'COLD BOOT TIME', value: '4.8ms Kernel to Userspace' },
      { label: 'JAIL MECHANISM', value: 'seccomp-bpf + cgroups v2' },
    ],
    fullContent:
      'Traditional containers share kernel surfaces, presenting non-trivial privilege escalation vectors. MicroVMs provision lightweight virtual machines utilizing minimal device emulation. We benchmark raw IO throughput and evaluate the trade-offs of hypervisor trap penalties versus container runtime vulnerabilities.',
  },
  {
    id: 'dispatch-06',
    category: 'crypto',
    orbit: 'ORBIT 0.63 AU // APPLIED CRYPTO',
    episode: 'EP-431 // RECURSIVE SNARKS',
    date: '2024.02.17 · 27 MIN READ',
    title: 'Nova Folding Schemes & IVC Accumulation',
    excerpt:
      'Eliminating expensive FFT and MSM operations from incremental verifiable computation. Implementing cycle of curves (Pasta / Vesta) to compress thousands of execution steps into a single scalar check.',
    targetOrScheme: 'SCHEME: NOVA RELAXED R1CS',
    attestationOrMetric: 'FOLD OVERHEAD: < 35ms',
    glyph: 'crypto-alt',
    specs: [
      { label: 'ACCUMULATION SCHEME', value: 'Nova Relaxed R1CS' },
      { label: 'CURVE CYCLE', value: 'Pallas & Vesta (255-bit)' },
      { label: 'RECURSION COST', value: '2 MSM Steps per Fold' },
      { label: 'PROOF COMPRESSION', value: 'Spartan Snark Finalizer' },
    ],
    fullContent:
      'Recursive zero-knowledge proofs traditionally demanded massive cryptographic machinery such as trusted setups and expensive Fast Fourier Transforms. Folding schemes like Nova replace traditional SNARK recursion with relaxed constraint system accumulation, collapsing arbitrary execution steps into an iterative scalar evaluation check.',
  },
];

export const WritingDispatches: React.FC<WritingDispatchesProps> = ({
  activeCategory,
  onSelectDispatch,
}) => {
  const filteredDispatches = DISPATCH_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section className="relative z-10 w-full mb-16 sm:mb-20">
      {/* Orbital Curved Coordinate Spine (Visual Anchor) */}
      <div
        className="absolute left-3.5 sm:left-6 md:left-7 top-0 bottom-0 pointer-events-none w-10 flex justify-center opacity-30"
        aria-hidden="true"
      >
        <div className="w-[1px] h-full bg-gradient-to-b from-[#353437] via-[#e5e1e4]/20 to-[#353437]" />
      </div>

      <div className="flex flex-col space-y-4 sm:space-y-6 w-full max-w-4xl mx-auto" id="dispatches-grid">
        {filteredDispatches.map((dispatch) => {
          return (
            <article
              key={dispatch.id}
              onClick={() => onSelectDispatch?.(dispatch)}
              className="dispatch-entry orbit-entry group relative bg-[#0e0e10]/80 hover:bg-[#1c1b1e]/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-white/[0.06] hover:border-white/20 transition-all duration-300 pl-11 sm:pl-16 md:pl-20 shadow-[0_0_20px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] cursor-pointer hover:translate-x-1"
              data-category={dispatch.category}
            >
              {/* Planetary Orbit Node Glyphs */}
              <div className="absolute left-2.5 sm:left-4 md:left-5 top-7 sm:top-8 w-6 h-6 flex items-center justify-center">
                {dispatch.glyph === 'systems' && (
                  <svg className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-700" fill="none" viewBox="0 0 24 24">
                    <circle className="group-hover:stroke-white/50 transition-colors" cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeDasharray="2 4" strokeWidth="1" />
                    <circle className="text-[#353437] group-hover:text-[#e5e1e4] transition-colors" cx="12" cy="12" fill="currentColor" r="4" />
                  </svg>
                )}
                {dispatch.glyph === 'consensus' && (
                  <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-700" fill="none" viewBox="0 0 24 24">
                    <circle className="group-hover:stroke-white/50 transition-colors" cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <circle cx="12" cy="12" r="5" stroke="rgba(255,255,255,0.3)" strokeDasharray="1 2" strokeWidth="1" />
                    <circle className="text-[#353437] group-hover:text-[#e5e1e4] transition-colors" cx="12" cy="12" fill="currentColor" r="2.5" />
                  </svg>
                )}
                {dispatch.glyph === 'crypto' && (
                  <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <rect className="text-[#353437] group-hover:text-[#e5e1e4] transition-colors" fill="currentColor" height="6" width="6" x="9" y="9" />
                  </svg>
                )}
                {dispatch.glyph === 'graphics' && (
                  <svg className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-1000" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" strokeWidth="1" />
                    <circle className="opacity-90 solitary-red-node" cx="12" cy="12" fill="#ff003c" r="3.2" />
                  </svg>
                )}
                {dispatch.glyph === 'systems-alt' && (
                  <svg className="w-6 h-6 transform group-hover:-rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <circle cx="12" cy="12" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  </svg>
                )}
                {dispatch.glyph === 'crypto-alt' && (
                  <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-700" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 2" strokeWidth="1" />
                    <circle className="text-[#353437] group-hover:text-[#e5e1e4] transition-colors" cx="12" cy="12" fill="currentColor" r="3" />
                  </svg>
                )}
              </div>

              {/* Header Badges & Date */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="datum-pill px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#201f22] text-[#c6c6cf] font-mono text-[8.5px] sm:text-[9px] tracking-widest uppercase border border-white/[0.06] flex items-center gap-1.5">
                    {dispatch.category === 'graphics' && (
                      <span className="w-1 h-1 rounded-full bg-[#ff003c]" />
                    )}
                    {dispatch.orbit}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.04] font-mono text-[8.5px] sm:text-[9px] text-[#c6c6cf]/60 tracking-widest">
                    {dispatch.episode}
                  </span>
                </div>
                <span className="font-mono text-[9px] sm:text-[9.5px] text-[#c6c6cf] tracking-widest">
                  {dispatch.date}
                </span>
              </div>

              {/* Title & Excerpt */}
              <div className="max-w-3xl">
                <h2
                  className="font-giant text-base sm:text-2xl md:text-3xl text-[#e5e1e4] uppercase group-hover:text-white transition-colors tracking-wide leading-snug sm:leading-normal mb-3 sm:mb-4"
                  style={{ lineHeight: '1.32' }}
                >
                  {dispatch.title}
                </h2>
                <p className="font-sans text-[11px] sm:text-sm text-[#c6c6cf] group-hover:text-[#e5e1e4] transition-colors font-light leading-relaxed mb-3 sm:mb-4">
                  {dispatch.excerpt}
                </p>
              </div>

              {/* Bottom Metadata Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-3 sm:pt-4 border-t border-[#353437]/40 font-mono text-[9.5px] sm:text-[10px]">
                <div className="flex items-center gap-2 sm:gap-4 text-[#c6c6cf] text-[8.5px] sm:text-[9.5px] truncate">
                  <span className="font-mono text-neutral-300">{dispatch.targetOrScheme}</span>
                  <span className="hidden md:inline text-white/20">·</span>
                  <span className="hidden md:inline text-neutral-400">{dispatch.attestationOrMetric}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] group-hover:bg-white/[0.1] text-[#c6c6cf] group-hover:text-white transition-all duration-200 border border-white/[0.06] group-hover:border-white/20 flex items-center justify-center gap-1.5 uppercase tracking-widest text-[9px] sm:text-[10px] shrink-0 self-start sm:self-auto font-mono cursor-pointer">
                  <span>READ DISPATCH</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
