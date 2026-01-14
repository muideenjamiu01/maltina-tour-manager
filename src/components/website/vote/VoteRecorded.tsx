import Image from "next/image";
import { Check } from "lucide-react";

export default function VoteRecordedSection() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-6xl mx-auto text-white">
        {/* Status Icon */}
        <div className="flex justify-center mb-3">
          <div className="w-30 h-30 md:w-30 md:h-30 rounded-full bg-orange-500 flex items-center justify-center">
            <Check className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-5xl md:text-8xl font-lilita tracking-tight drop-shadow">
          Vote Recorded
        </h1>
        <p className="text-center text-black text-xl md:text-2xl mb-12">
          Your vote has been successfully recorded at 10:03:13
        </p>

        {/* You voted for */}
        <h2 className="text-4xl sm:text-5xl font-semibold mb-4 text-black">
          You Voted for:
        </h2>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="w-full">
            <div className="relative h-64 sm:h-75 w-full md:w-[89%]">
              <Image
                src="/assets/sampleperson.png"
                alt="Design submission"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div>
          <h3 className="text-3xl sm:text-5xl font-bold text-black text-center sm:text-left">
  Design by Blessing N.
</h3>

<p className="mt-1 text-xl sm:text-2xl font-semibold text-black text-center sm:text-left">
  Student Information
</p>

            <div className="mt-4 space-y-2 text-md">
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span className="font-medium text-black">Name</span>
                <span className="text-black">Blessing N.</span>
              </div>

              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span className="font-medium text-black">School</span>
                <span className="text-black">Royal Academy</span>
              </div>

              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span className="font-medium text-black">Location</span>
                <span className="text-black">Ikeja, Lagos State</span>
              </div>

              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span className="font-medium text-black">Zone</span>
                <span className="text-black">Zone 3</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-black">Submitted</span>
                <span className="text-gray-800">January 10, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="mb-10">
          <h4 className="text-2xl font-bold mb-3 text-black">What Happens Next</h4>
          <div className="text-md text-black leading-loose opacity-95 space-y-4">
            <p className="text-lg sm:text-xl">
              <strong>Your Vote Counts:</strong> Your vote has been securely
              recorded and verified. It will contribute to determining the
              winning design.
            </p>
            <p className="text-lg sm:text-xl">
              <strong>One Vote Per Person:</strong> Each mobile number can vote
              only once for the entire voting period. Your vote has been locked in.
            </p>
            <p className="text-lg sm:text-xl">
              <strong>Vote Verification:</strong> Your vote was verified using
              SMS OTP authentication to ensure fair and secure voting.
            </p>
            <p className="text-lg sm:text-xl">
              <strong>Winning Design:</strong> At the end of the voting period,
              the design with the most votes will be featured on limited edition
              Milk lunch bags distributed during the Science Nourishment Tour.
            </p>
          </div>
        </div>

        {/* Share section */}
        <div className="mb-10">
          <h4 className="text-xl text-black font-bold mb-2">Share This Design</h4>
          <p className="text-lg sm:text-xl opacity-95 text-black mb-4">
            Help this design win by sharing it with your friends and family!
          </p>

          {/* Top buttons */}
          {/* Top Buttons - Centered and auto-width on mobile */}
<div className="flex flex-col sm:flex-row gap-4 mb-6 items-center sm:items-start ">
  <button className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition w-auto">
    Copy Share Link
  </button>
  <button className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition w-auto">
    Share on Social Media
  </button>
</div>

{/* Bottom Buttons - Centered and auto-width on mobile */}
<div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start ">
  <button className="bg-gray-100 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition w-auto">
    Browse More Designs
  </button>
  <button className="bg-gray-100 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition w-auto">
    Return to Homepage
  </button>
</div>
        </div>
      </div>
    </section>
  );
}
