"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface RegionTabsProps {
  regions: string[];
  activeRegion: string | null;
  onRegionChange: (region: string | null) => void;
}

export default function RegionTabs({ regions, activeRegion, onRegionChange }: RegionTabsProps) {
  return (
   <div className="flex justify-center">
 <div className="flex flex-col items-start justify-center gap-4 mb-6">
      <p className="text-[#292526] font-normal whitespace-nowrap">Jump to region</p>
      <div role="tablist" aria-label="Jump to region" className="flex flex-wrap justify-center gap-3">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => onRegionChange(activeRegion === region ? null : region)}
            aria-pressed={activeRegion === region}
            className={cn(
              'px-4 py-2 rounded-lg font-normal transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F66F39]',
              activeRegion === region
                ? 'bg-[#F66F39] text-white shadow-md'
                : 'bg-transparent text-[#292526] hover:bg-white/50'
            )}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
   </div>
  );
}
