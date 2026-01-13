"use client";

import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Browse Finalists",
    text: "View 18 shortlisted designs from talented children across Nigeria’s 6 zones.",
  },
  {
    number: "2",
    title: "Cast Your Vote",
    text: "Select your favourite design and submit your vote. One vote per person.",
  },
  {
    number: "3",
    title: "Winners Announced",
    text: "The design with the most votes in each zone wins and goes into production.",
  },
];

export default function HowToVote() {
  return (
    <section className="relative w-full min-h-[40vh] overflow-hidden bg-[#f6a623]">
      {/* Background texture */}
      <Image
        src="/assets/background.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Maltina bottle – FIXED POSITION */}
      <div className="absolute bottom-[-700px] right-[-600px] z-10 hidden lg:block pointer-events-none">
        <Image
          src="/assets/source_33cl.png"
          alt="Maltina Bottle"
          width={2000}
          height={1500}
          priority
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-9 pb-24 text-white">
        <h1 className="font-Lilita_One relative z-10 flex flex-col items-center text-center text-5xl md:text-7xl drop-shadow-md">
          How Voting Works
        </h1>


        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-20">
          {steps.map((step) => (
            <div key={step.number} className="flex justify-center">
              <div className="relative w-[300px] h-[300px] ">
                
                {/* Step background image */}
                <Image
                  src="/assets/Stepsbg.png"
                  alt="Step background"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Step content */}
             <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pt-10">
  <span className="absolute top-1 -mt-3 font-['Lilita_One'] text-8xl leading-none drop-shadow-md">
    {step.number}
  </span>

<div className="max-w-[170px]">
  <h3 className="font-['Poppins'] mt-3 font-bold text-2xl leading-none">
    {step.title}
  </h3>

  <p className="text-lg md:text-xl lg:text-sm leading-tight mt-2">
    {step.text}
  </p>
</div>

</div>

              </div>
            </div>
          ))}
        </div>

   

      {/* Voting Rules */}
{/* Voting Rules */}
{/* Voting Rules */}
<div className="mt-20">
  <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
    <div className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-black">
      <h4 className="font-bold mb-3 text-2xl">Voting Rules</h4>

      <ul className="list-disc list-inside space-y-3 text-xl">
        <li>One vote per person across all zones</li>
        <li>6 winners will be selected – one from each geo-political zone</li>
        <li>Voting opens: [Start Date] and closes: [End Date]</li>
        <li>Winners will be announced on: [Announcement Date]</li>
        <li>All votes are final and cannot be changed once submitted</li>
      </ul>
    </div>
  </div>
</div>




        {/* CTA */}
     <div className="mt-10 flex justify-center">
  <Link
    href="/voteforFavourite"
    className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-orange-100 transition"
  >
    View all 18 finalists
  </Link>
</div>

      </div>
    </section>
  );
}
