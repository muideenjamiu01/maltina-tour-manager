"use client";

import Image from "next/image";
import Navbar from "@/components/website/layout/navbar";
import Footer from "@/components/website/layout/footer";
import Link from "next/link"

export default function VoteConfirm() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Image
        src="/assets/background.png"
        alt="Vote background"
        fill
        priority
        className="object-cover"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
      

        <main className="flex-1 px-4 py-20  ">
            {/* LEFT SIDE */}
<div className="space-y-2 text-black max-w-md mx-6 md:mx-20 mt-6 ml-6 mb-4">
  {/* Article / Function Text */}
  <div className="space-y-2">

    {/* Back Link */}
    <Link
      href="/finalists"
      className="inline-flex items-center gap-2 text-black text-sm font-medium px-2 py-1 rounded-md"
    >
      ← Back to all Finalists
    </Link>

    {/* Location */}

   <div className="ml-5">
  <div>
    <p className="inline-block border-2 border-orange-400 text-black px-2 py-1 rounded text-sm">
      South West
    </p>
    <p className="inline-block ml-2 text-sm">
      Lagos
    </p>
  </div>

  {/* Name */}
  <p className="text-md font-medium">
    Aisha. K
  </p>

  {/* Meta info */}
  <p className="text-xs text-black">
    Age 12 • Female • JSS 2 • Government Primary School Ikeja
  </p>
</div>
</div>
</div>


          <div className="max-w-md mx-auto text-center space-y-6 pt-5">

            {/* TOP DESIGNER IMAGE */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/sampleperson.png"
                alt="Designer"
                fill
                className="object-cover"
              />
            </div>

            {/* DESIGN IMAGE */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/assets/sampleperson.png"
                alt="Design artwork"
                fill
                className="object-cover"
              />
            </div>

            {/* DESIGN STORY */}
            <div className="bg-white/90 rounded-lg p-4 text-left shadow-md">
              <h3 className="font-semibold text-sm text-gray-800">
                Design Story
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                This design represents creativity, culture, and imagination
                inspired by everyday life and the joy of childhood.
              </p>
            </div>

            {/* CONFIRM VOTE BUTTON */}
           {/* CONFIRM YOUR VOTE SECTION */}
<div className="  px-4 py-4 text-left space-y-5 ">

  {/* TITLE */}
  <h3 className="font-semibold text-black text-sm">
    Confirm Your Vote
  </h3>

  {/* EMAIL */}
  <div>
    <label className="block text-sm text-black mb-1">
      Email <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full bg-gray-100 text-black placeholder-gray-400 
                 rounded-md px-4 py-3 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>

  {/* MOBILE */}
  <div>
    <label className="block text-sm text-black mb-1">
      Mobile No <span className="text-red-500">*</span>
    </label>
    <input
      type="tel"
      placeholder="Enter your mobile number"
      className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 
                 rounded-md px-4 py-3 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>

  {/* HELPER TEXT */}
  <p className="text-xs text-black text-center leading-relaxed">
    You can only vote once using the same email and mobile number.
  </p>

  {/* CONFIRM BUTTON */}
 <Link href="/beforeConfirming">
  <button
    type="button"
    className="bg-gray-100 text-black rounded-md transition p-2 hover:bg-gray-200"
  >
    Confirm Vote for this Design
  </button>
</Link>

  {/* RULES LINK */}
  <div className="text-center pt-4">
    <a
      href="#"
      className="text-sm underline text-black  rounded-2xl  p-2"
    >
      Read competition rules
    </a>
  </div>

</div>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
