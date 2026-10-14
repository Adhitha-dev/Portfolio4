import React from 'react';

export const Bay01CrtAperture: React.FC = () => {
  return (
    <section className="w-[86vw] xs:w-[84vw] sm:w-[540px] md:w-[600px] lg:w-[700px] xl:w-[740px] lg:min-w-[660px] max-w-full flex-shrink-0 snap-center bg-gradient-to-b from-[#131317] to-[#0d0d10] border border-white/10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.25rem] p-3.5 sm:p-5 lg:p-7 flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] relative overflow-hidden group">
      {/* Bay Header */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 lg:pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#18181f] border border-white/15 flex items-center justify-center shadow-inner flex-shrink-0">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-zinc-300" />
          </div>
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-200 block font-medium">
              BAY 01 // CRT APERTURE
            </span>
            <span className="font-mono text-[8.5px] sm:text-[10px] text-zinc-500 uppercase tracking-wider">
              PRIMARY BEACON MONITOR
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[8.5px] sm:text-[10px] text-zinc-400 bg-[#16161b] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/5 tracking-wider">
            FREQ: 1420.4 MHz
          </span>
        </div>
      </div>

      {/* CRT Inner Screen */}
      <div className="my-2 sm:my-3 lg:my-4 p-3.5 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-[1.75rem] bg-gradient-to-b from-[#09090c] to-[#040406] border border-white/10 shadow-[inset_0_4px_16px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)] relative flex flex-col justify-between overflow-hidden">
        {/* Soft upper glare reflection */}
        <div className="absolute -top-12 -left-12 -right-12 h-24 bg-gradient-to-b from-white/[0.04] to-transparent rounded-full pointer-events-none blur-sm" />

        {/* Station coordinates & Live Carrier status */}
        <div className="flex items-center justify-between mb-2 sm:mb-4 gap-1">
          <span className="font-mono text-zinc-500 tracking-widest uppercase text-[8px] sm:text-[10px] truncate">
            STATION COORD: 37.7749° N / 122.4194° W
          </span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-pulse" />
            <span className="font-mono text-zinc-400 tracking-wider uppercase text-[8.5px] sm:text-[9px]">LIVE CARRIER</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="py-1.5 sm:py-3 lg:py-4">
          <h2 className="font-giant text-2xl xs:text-3xl sm:text-4xl lg:text-[58px] leading-[0.95] text-zinc-100 uppercase tracking-tight font-normal">
            TRANSMIT<br />
            <span className="text-zinc-500">ADVISORY</span>
          </h2>
          <p className="font-sans text-zinc-400 text-[11px] sm:text-sm lg:text-base mt-2 sm:mt-3 lg:mt-4 font-light leading-relaxed max-w-md">
            Direct council on high-assurance kernel runtimes, sovereign infrastructure topologies, and cryptographic consensus protocols.
          </p>
        </div>

        {/* Dispatch Channel strip */}
        <div className="pt-2 sm:pt-3 lg:pt-4 border-t border-white/[0.08] flex items-center justify-between text-zinc-400 font-mono text-[8.5px] sm:text-[10px]">
          <span className="tracking-widest uppercase text-zinc-500">DISPATCH CHANNEL</span>
          <span className="font-mono text-zinc-300">GENEVA · SAN FRANCISCO · TOKYO</span>
        </div>
      </div>

      {/* 3 Metric Tiles */}
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-1 sm:pt-2">
        <div className="bg-[#121216] border border-white/[0.06] rounded-xl sm:rounded-2xl p-2 sm:p-3 lg:p-3.5 flex flex-col gap-0.5 sm:gap-1 shadow-inner">
          <span className="font-mono text-zinc-500 uppercase tracking-widest text-[7.5px] sm:text-[9px]">
            SLA WINDOW
          </span>
          <span className="font-mono text-white text-[10px] sm:text-xs font-semibold">
            &lt; 12 HOURS
          </span>
          <span className="text-[7.5px] sm:text-[9px] text-zinc-500 font-mono">PRIORITY QUEUE</span>
        </div>

        <div className="bg-[#121216] border border-white/[0.06] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 flex flex-col gap-0.5 sm:gap-1 shadow-inner">
          <span className="font-mono text-zinc-500 uppercase tracking-widest text-[8px] sm:text-[9px]">
            SECURITY CLASS
          </span>
          <span className="font-mono text-white text-[11px] sm:text-xs font-semibold">
            ZERO TRUST
          </span>
          <span className="text-[8px] sm:text-[9px] text-zinc-500 font-mono">ENCRYPTED REST</span>
        </div>

        <div className="bg-[#121216] border border-white/[0.06] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 flex flex-col gap-0.5 sm:gap-1 shadow-inner">
          <span className="font-mono text-zinc-500 uppercase tracking-widest text-[8px] sm:text-[9px]">
            CAPACITY
          </span>
          <span className="font-mono text-zinc-200 text-[11px] sm:text-xs font-semibold">
            2 SLOTS OPEN
          </span>
          <span className="text-[8px] sm:text-[9px] text-zinc-500 font-mono">Q3/Q4 RETAINER</span>
        </div>
      </div>
    </section>
  );
};
