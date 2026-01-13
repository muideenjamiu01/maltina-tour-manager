"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroOverlay() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Gradient Background */}
      <Image
        src="/assets/vtbg.png"
        alt="Lunch bag campaign background"
        fill
        priority
        className="object-cover object-center"
      />


      {/* Content Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* LEFT — Text Content */}
          <div>
           
  <h1 className="
    font-['Lilita_One']
    text-white
    text-4xl
    md:text-6xl
    lg:text-[80px]
    leading-tight
    mb-6
  ">
    Vote for Your Favourite Lunch Bag Design
  </h1>

            <p className="mt-6 text-[#2B2B2B] text-lg sm:text-xl max-w-lg">
              Help us choose 6 winning designs, one from each geo-political
              zone across Nigeria.
            </p>

            <p className="mt-4 text-[#2B2B2B]/80 text-base max-w-lg">
              Your vote will decide which lunch bag designs get produced and
              distributed to schools in the Maltina Nourishment Tour.
            </p>


          </div>

       
        </div>
      </div>
    </section>
  );
}
