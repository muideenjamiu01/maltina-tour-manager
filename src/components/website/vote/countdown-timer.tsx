'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      // Set end date to 30 days from now
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);

      const now = new Date().getTime();
      const difference = endDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4 sm:gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 w-20 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

 const ORANGE = '#FF7A3D';
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      {/* Orange glow */}
      <div
        className="absolute inset-0 rounded-xl blur-lg opacity-60"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${ORANGE}80, transparent 65%)`,
        }}
      />

      {/* Orange card */}
      <div
        className="relative rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-16 sm:min-w-24 shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${ORANGE}, #ff9a6b)`,
        }}
      >
        <span className="text-2xl sm:text-4xl font-bold text-white block text-center tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
    </div>

    <span className="text-xs sm:text-sm font-semibold mt-3 uppercase tracking-wider text-orange-600">
      {label}
    </span>
  </div>
);

  return (
    <div className="flex justify-center gap-3 sm:gap-6 items-center flex-wrap">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-2xl sm:text-3xl font-bold text-primary animate-pulse">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-2xl sm:text-3xl font-bold text-primary animate-pulse">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <div className="text-2xl sm:text-3xl font-bold text-primary animate-pulse">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}
