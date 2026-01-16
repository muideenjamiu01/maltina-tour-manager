"use client";

import React from 'react';
import Image from 'next/image';
import { School } from '@/types/tour.types';

interface TourMapProps {
  schools: School[];
}

export default function TourMap({ schools }: TourMapProps) {
  return (
   <div className="">
     <div className="bg-white p-2 shadow-lg overflow-hidden border-4 border-white flex justify-center items-center">
      <Image
        src="/images/websites/track/map.png"
        alt="Tour map"
        width={1649}
        height={600}
        className="w-full lg:h-[550px] max-w-[1649px]"
        priority
      />
    </div>
   </div>
  );
}
