import React, { useState, useEffect } from 'react';

export const TelemetryMemoryBus: React.FC = () => {
  const [barHeights, setBarHeights] = useState<number[]>([
    19, 18, 14, 8, 23, 30, 16, 19, 9, 10,
  ]);
  const [entropy, setEntropy] = useState(0.99984);

  useEffect(() => {
    const timer = setInterval(() => {
      setBarHeights(
        Array.from({ length: 10 }, () => Math.floor(Math.random() * 24) + 6)
      );
      setEntropy(Number((0.9998 + (Math.random() * 0.00015 - 0.00007)).toFixed(5)));
    }, 450);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative z-10 w-full mb-12 sm:mb-16 p-4 sm:p-6 md:p-8 bg-[#0e0e10]/90 border border-white/[0.08] backdrop-blur-md rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#e5e1e4] rounded-full animate-pulse" />
            <h3
              className="font-giant text-base sm:text-lg md:text-xl text-[#e5e1e4] tracking-wider uppercase font-normal leading-snug sm:leading-normal"
              style={{ lineHeight: '1.32' }}
            >
              TELEMETRY MEMORY TRACE BUS // DIAGNOSTIC MATRIX
            </h3>
          </div>
          <p className="font-mono text-[9px] sm:text-[10px] text-[#c6c6cf] tracking-widest uppercase">
            LIVE RING BUFFER SPECTROGRAM · REALTIME KERNEL HARMONICS
          </p>
        </div>

        {/* Live Equalizer Undulating Data Bars */}
        <div
          className="flex items-end gap-1.5 h-8 px-4 py-1.5 bg-[#1c1b1e] rounded-full border border-white/10 shrink-0 self-start md:self-auto"
          id="bus-equalizer"
          aria-label="Real-time kernel harmonics equalizer"
        >
          {barHeights.map((h, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                i % 3 === 0
                  ? 'bg-[#e5e1e4]'
                  : i % 2 === 0
                  ? 'bg-[#c6c6cf]/70'
                  : 'bg-[#c6c6cf]/40'
              }`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      {/* Telemetry Coordinates Table Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 font-mono text-[11px] sm:text-xs pt-4 border-t border-white/[0.06]">
        <div className="flex flex-col space-y-1 p-2.5 sm:p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
          <span className="text-[#c6c6cf]/70 text-[9px] sm:text-[10px] tracking-widest uppercase">
            ORBIT PERIOD
          </span>
          <span className="text-[#e5e1e4] font-semibold tabular-nums">248.6 ms</span>
        </div>
        <div className="flex flex-col space-y-1 p-2.5 sm:p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
          <span className="text-[#c6c6cf]/70 text-[9px] sm:text-[10px] tracking-widest uppercase">
            ALLOCATOR
          </span>
          <span className="text-[#e5e1e4] font-semibold">jemalloc v5.3</span>
        </div>
        <div className="flex flex-col space-y-1 p-2.5 sm:p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
          <span className="text-[#c6c6cf]/70 text-[9px] sm:text-[10px] tracking-widest uppercase">
            KERNEL SYNC
          </span>
          <span className="text-[#e5e1e4] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            eBPF RING // OK
          </span>
        </div>
        <div className="flex flex-col space-y-1 p-2.5 sm:p-3 rounded-lg bg-white/[0.02] border border-white/[0.03]">
          <span className="text-[#c6c6cf]/70 text-[9px] sm:text-[10px] tracking-widest uppercase">
            ENTROPY LEVEL
          </span>
          <span className="text-[#e5e1e4] font-semibold tabular-nums">
            {entropy.toFixed(5)} BITS
          </span>
        </div>
      </div>
    </section>
  );
};
