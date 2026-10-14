import React from 'react';

interface WritingFooterProps {
  onOpenConnect: () => void;
}

export const WritingFooter: React.FC<WritingFooterProps> = ({ onOpenConnect }) => {
  return (
    <footer className="relative z-10 w-full px-4 sm:px-6 md:px-14 py-4 sm:py-6 border-t border-white/[0.06] bg-[#040406]/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[9px] sm:text-[10px] text-[#c6c6cf] tracking-widest uppercase text-center">
      {/* Left: Dual-Layer Pulsing Red LED Beacon + Available for Work */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-[#ff003c] opacity-75 animate-ping"
            style={{ animationDuration: '2s' }}
          />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff003c] shadow-[0_0_8px_#ff003c]" />
        </div>
        <span className="text-white font-medium tracking-[0.2em]">AVAILABLE FOR WORK</span>
        <span className="text-white/20">/</span>
        <span className="text-[#c6c6cf]/80">Q2—Q3 CONTRACTS</span>
      </div>

      {/* Right: Frosted Glass Connect Action Button (Triggers Intro Transition) */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={onOpenConnect}
          className="btn-connect-glow px-5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] active:bg-white/[0.18] text-white/90 hover:text-white backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 tracking-[0.2em] uppercase font-mono text-[10px] sm:text-[11px] flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 cursor-pointer"
          id="writing-connect-button"
        >
          <span>CONNECT</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </button>
      </div>
    </footer>
  );
};
