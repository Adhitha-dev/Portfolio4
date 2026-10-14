import React from 'react';
import { WritingCategory } from '../../types/writing';

interface WritingFilterTabsProps {
  activeCategory: WritingCategory;
  onSelectCategory: (category: WritingCategory) => void;
  counts: {
    all: number;
    systems: number;
    consensus: number;
    crypto: number;
    graphics: number;
  };
}

export const WritingFilterTabs: React.FC<WritingFilterTabsProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  const tabs: {
    key: WritingCategory;
    label: string;
    count: string;
    hasRedDot?: boolean;
  }[] = [
    { key: 'all', label: 'ALL ORBITS', count: String(counts.all).padStart(2, '0') },
    { key: 'systems', label: 'SYSTEMS', count: String(counts.systems).padStart(2, '0') },
    { key: 'consensus', label: 'CONSENSUS', count: String(counts.consensus).padStart(2, '0') },
    { key: 'crypto', label: 'APPLIED CRYPTO', count: String(counts.crypto).padStart(2, '0') },
    {
      key: 'graphics',
      label: 'GRAPHICS',
      count: String(counts.graphics).padStart(2, '0'),
      hasRedDot: true,
    },
  ];

  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#0e0e10]/90 border border-white/10 w-full sm:w-fit overflow-x-auto no-scrollbar shadow-lg"
      role="tablist"
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(tab.key)}
            className={`filter-pill group relative px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap text-[9px] sm:text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 ${
              isActive
                ? 'bg-[#1c1b1e] text-[#e5e1e4] shadow-sm border border-white/10'
                : 'bg-transparent text-white/50 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-transform ${
                tab.hasRedDot
                  ? 'bg-[#ff003c]'
                  : isActive
                  ? 'bg-[#e5e1e4] group-hover:scale-125'
                  : 'bg-white/20 group-hover:scale-125'
              }`}
            />
            <span>{tab.label}</span>
            <span
              className={`font-mono text-[9px] sm:text-[10px] ${
                isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'
              }`}
            >
              ({tab.count})
            </span>
          </button>
        );
      })}
    </div>
  );
};
