import React from 'react';

interface ConnectFooterProps {
  onReturnHome?: () => void;
  onNavigateToWork?: () => void;
}

export const ConnectFooter: React.FC<ConnectFooterProps> = ({
  onReturnHome,
  onNavigateToWork,
}) => {
  return (
    <footer className="w-full border-t border-white/[0.06] py-2.5 sm:py-3.5 z-40 bg-[#040405]">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-row items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
        {/* Left: Status Indicator / Work Link */}
        <button
          type="button"
          onClick={onNavigateToWork}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none"
          title="Navigate to Work"
        >
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff003c] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff003c] shadow-[0_0_8px_#ff003c]" />
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white transition-colors">
            AVAILABLE FOR WORK
          </span>
        </button>

        {/* Center: Coordinates & Latency (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-zinc-500 font-mono text-[10px] tracking-[0.16em]">
          <span>COORD // 37.7749° N, 122.4194° W</span>
          <span>LATENCY // 14MS</span>
        </div>

        {/* Right: Active Connect Pill Button */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onReturnHome}
            title="Return to Hero"
            className="inline-flex items-center gap-1.5 sm:gap-2 border border-[#ff003c]/30 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/30 text-white font-mono text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full uppercase transition-all shadow-inner active:scale-95 shadow-[0_0_8px_rgba(255,0,60,0.5)] cursor-pointer"
          >
            <span className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff003c] opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff003c] shadow-[0_0_8px_#ff003c]" />
            </span>
            <span>CONNECT</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
