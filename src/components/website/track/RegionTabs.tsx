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
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <span className="text-gray-900 font-semibold whitespace-nowrap">Jump to region</span>
      <div className="flex flex-wrap justify-center gap-3">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => onRegionChange(activeRegion === region ? null : region)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-all',
              activeRegion === region
                ? 'bg-[#F66F39] text-white shadow-md'
                : 'bg-transparent text-gray-900 hover:bg-white/50'
            )}
          >
            {region}
          </button>
        ))}
      </div>
    </div>
  );
}
