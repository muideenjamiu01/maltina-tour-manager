"use client";

import React from 'react';
import { TourMetrics } from '@/types/tour.types';

interface MetricsCardProps {
  metrics: TourMetrics;
}

export default function TourMetricsCards({ metrics }: MetricsCardProps) {
  const metricsData = [
    {
      label: 'Children Reached',
      value: metrics.childrenReached.toLocaleString(),
    },
    {
      label: 'Schools Activated',
      value: metrics.schoolsActivated.toLocaleString(),
    },
    {
      label: 'States Visited',
      value: metrics.statesVisited.toLocaleString(),
    },
    {
      label: 'Activation Completed',
      value: metrics.activationCompleted.toLocaleString(),
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {metricsData.map((metric, index) => (
        <div
          key={index}
          className="relative aspect-square"
        >
          {/* Yellow outer border */}
          <div className="absolute inset-0 bg-[#FFDF08] rounded-[48%]"></div>
          {/* White middle border */}
          <div className="absolute inset-[6px] md:inset-[8px] bg-white rounded-[48%]"></div>
          {/* Orange fill with content */}
          <div className="absolute inset-[10px] md:inset-[14px] bg-[#FF6F38] rounded-[48%] flex flex-col items-center justify-center p-4 md:p-6 shadow-lg">
            <p className="text-white text-sm md:text-base font-semibold text-center mb-2">
              {metric.label}
            </p>
            <p className="text-white text-3xl md:text-4xl lg:text-5xl font-black">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
