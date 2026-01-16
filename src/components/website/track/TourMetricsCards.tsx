'use client';

import { TourMetrics } from '@/types/tour.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MetricsCardProps {
  metrics: TourMetrics;
}

export default function TourMetricsCards({ metrics }: MetricsCardProps) {
  const stats = [
    {
      image: '/images/websites/track/step-1.png',
      title: 'Children\nReached',
      value: '184,200',
    },
    {
      image: '/images/websites/track/step-2.png',
      title: 'Schools\nActivated',
      value: '342',
    },
    {
      image: '/images/websites/track/step-3.png',
      title: 'States\nVisited',
      value: '24',
    },
    {
      image: '/images/websites/track/step-4.png',
      title: 'Activation\nCompleted',
      value: '342',
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mb-14 px-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex-1 relative h-56 md:h-72 lg:h-80 transform hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={item.image}
            alt={item.title.replace('\n', ' ')}
            fill
            className="object-contain"
            priority
          />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
              <p className="text-white font-poppins text-base sm:text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2 whitespace-pre-line">
                {item.title}
              </p>
              <p className="text-white font-lilita text-3xl sm:text-4xl drop-shadow-md">
                <CountUp end={parseInt(item.value.replace(/,/g, ''), 10) || 0} duration={1200} />
              </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CountUp({ end, duration = 1000 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(progress * end);
      setValue(current);
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration]);

  return <>{value.toLocaleString()}</>;
}
