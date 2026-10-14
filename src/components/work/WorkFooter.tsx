import React from 'react';

interface WorkFooterProps {
  onOpenConnect: () => void;
}

export const WorkFooter: React.FC<WorkFooterProps> = ({ onOpenConnect }) => {
  return (
    <footer className="relative z-20 w-full bg-[#07080a]/90 backdrop-blur-xl border-t border-white/[0.06] py-2 sm:py-3">
      <div className="h-12 sm:h-14 w-full px-4 sm:px-8 md:px-14 flex items-center justify-between">
        {/* Left: Authentic Double-Pulse Radar Beacon */}
        <div className="flex items-center gap-2 sm:gap-3 group cursor-default min-w-0 mr-2">
          <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ backgroundColor: 'rgb(255, 0, 60)' }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2"
              style={{
                backgroundColor: 'rgb(255, 0, 60)',
                boxShadow:
                  '0 0 10px rgba(255, 0, 60, 0.95), 0 0 20px rgba(255, 0, 60, 0.5)',
              }}
            />
          </div>
          <span className="font-micro text-[8.5px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.24em] uppercase text-neutral-400 font-medium group-hover:text-white transition-colors truncate">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Right: Tactile CONNECT Pill Button (triggers intro transition to connect page) */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenConnect}
            className="btn-connect-glow relative inline-flex items-center justify-center font-micro text-[9.5px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.24em] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full border border-neutral-800 bg-white/[0.04] backdrop-blur-md hover:bg-white hover:text-black hover:border-white focus:outline-none focus:ring-1 focus:ring-white cursor-pointer active:scale-95 transition-all"
            id="work-connect-button"
          >
            CONNECT
          </button>
        </div>
      </div>
    </footer>
  );
};
