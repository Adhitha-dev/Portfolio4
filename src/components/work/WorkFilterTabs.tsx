import React from 'react';
import { WorkCategory } from '../../types/work';

interface WorkFilterTabsProps {
  activeCategory: WorkCategory;
  onSelectCategory: (category: WorkCategory) => void;
  counts: {
    all: number;
    web: number;
    sec: number;
    vfx: number;
  };
}

export const WorkFilterTabs: React.FC<WorkFilterTabsProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  const tabs: { key: WorkCategory; label: string; count: string }[] = [
    { key: 'all', label: 'All Works', count: String(counts.all).padStart(2, '0') },
    { key: 'web', label: 'Web Systems', count: String(counts.web).padStart(2, '0') },
    { key: 'sec', label: 'Security / Crypto', count: String(counts.sec).padStart(2, '0') },
    { key: 'vfx', label: '3D & VFX', count: String(counts.vfx).padStart(2, '0') },
  ];

  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#15171d]/90 border border-white/[0.07] backdrop-blur-md shadow-lg overflow-x-auto no-scrollbar max-w-full"
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
            className={`filter-tab px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-[10.5px] sm:text-xs font-sans font-medium tracking-wide transition-all flex items-center gap-1.5 sm:gap-2 group cursor-pointer shrink-0 whitespace-nowrap ${
              isActive
                ? 'bg-[#f2f3f5] text-[#07080a] shadow-sm'
                : 'text-[#7a7d88] hover:text-[#f2f3f5]'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[9px] sm:text-[10px] font-micro px-1.5 py-0.5 rounded-full transition-colors ${
                isActive
                  ? 'bg-black/10 text-[#07080a] font-semibold'
                  : 'bg-white/[0.04] text-[#7a7d88] group-hover:text-[#f2f3f5]'
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
