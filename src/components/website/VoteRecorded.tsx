import Image from "next/image";
import { Check } from "lucide-react";

export default function VoteRecordedSection() {
  return (
    <section className="bg-gradient-to-b from-amber-400 to-orange-500 px-4 py-16">
      <div className="max-w-6xl mx-auto text-white">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center shadow-lg">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-2">
          Vote Recorded
        </h1>
        <p className="text-center text-base opacity-95 mb-12">
          Your vote has been successfully recorded at 10:03:13
        </p>

        {/* You voted for */}
        <h2 className="text-2xl font-bold mb-6">
          You Voted for:
        </h2>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="w-full">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-white/20">
              <Image
                src="/sample-design.jpg" // replace with real image
                alt="Voted Design"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Design info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Design by Blessing N.
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex border-b border-white/30 pb-1">
                <span className="w-32 font-semibold">Name</span>
                <span>Blessing N.</span>
              </div>
              <div className="flex border-b border-white/30 pb-1">
                <span className="w-32 font-semibold">School</span>
                <span>Royal Academy</span>
              </div>
              <div className="flex border-b border-white/30 pb-1">
                <span className="w-32 font-semibold">Location</span>
                <span>Ikeja, Lagos State</span>
              </div>
              <div className="flex border-b border-white/30 pb-1">
                <span className="w-32 font-semibold">Zone</span>
                <span>Zone 3</span>
              </div>
              <div className="flex border-b border-white/30 pb-1">
                <span className="w-32 font-semibold">Submitted</span>
                <span>January 10, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="max-w-4xl mb-10">
          <h4 className="text-xl font-bold mb-3">
            What Happens Next
          </h4>

          <div className="space-y-3 text-sm leading-relaxed opacity-95">
            <p>
              <strong>Your Vote Counts:</strong> Your vote has been securely
              recorded and verified. It will contribute to determining the
              winning design.
            </p>
            <p>
              <strong>One Vote Per Person:</strong> Each mobile number can vote
              only once for the entire voting period. Your vote has been locked in.
            </p>
            <p>
              <strong>Vote Verification:</strong> Your vote was verified using
              SMS OTP authentication to ensure fair and secure voting.
            </p>
            <p>
              <strong>Winning Design:</strong> At the end of the voting period,
              the design with the most votes will be featured on limited edition
              Milk lunch bags distributed during the Science Nourishment Tour.
            </p>
          </div>
        </div>

        {/* Share section */}
        <div className="mb-10">
          <h4 className="text-xl font-bold mb-2">
            Share This Design
          </h4>
          <p className="text-sm opacity-95 mb-4">
            Help this design win by sharing it with your friends and family!
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition">
              Copy Share Link
            </button>
            <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition">
              Share on Social Media
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition">
              Browse More Designs
            </button>
            <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition">
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
