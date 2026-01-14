"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function ConfirmVoteSection() {
  const router = useRouter();
  return (
    <section className="w-full px-4 py-3 pt-35">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-white text-center sm:text-left">
          <h1 className="text-4xl sm:text-8xl font-lilita tracking-tight drop-shadow">
            Confirm Your Vote
          </h1>

          <p className="mt-1 text-lg sm:text-3xl text-black opacity-90">
            Review your vote before confirming
          </p>
        </div>

        {/* Voted For */}
        <div className="mt-5">
          <h2 className="mb-1 font-Poppins text-xl sm:text-[3.5rem] font-semibold text-black text-center sm:text-left">
            You are voting for:
          </h2>

          {/* Card */}
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Image */}
              <div className="relative h-64 sm:h-75 w-full md:w-[89%] rounded-lg overflow-hidden">
                <Image
                  src="/assets/sampleperson.png"
                  alt="Design submission"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-5xl font-bold text-black">
                  Design by Blessing N.
                </h3>

                <p className="mt-1 text-lg sm:text-2xl font-semibold text-black">
                  Student Information
                </p>

                <div className="mt-4 space-y-2 text-sm sm:text-md">
                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="text-sm sm:text-xl text-black">Name</span>
                    <span className="text-black">Blessing N.</span>
                  </div>

                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="text-sm sm:text-base text-black">School</span>
                    <span className="text-black">Royal Academy</span>
                  </div>

                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="text-sm sm:text-base text-black">Location</span>
                    <span className="text-black">Ikeja, Lagos State</span>
                  </div>

                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="text-sm sm:text-base text-black">Zone</span>
                    <span className="text-black">Zone 3</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-black">Submitted</span>
                    <span className="text-gray-800 text-sm sm:text-base">
                      January 10, 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-7 rounded-xl px-3 py-3 text-sm sm:text-md text-black">
          <h4 className="mb-2 font-bold text-lg sm:text-2xl">Important Information</h4>

          <ul className="space-y-2 leading-relaxed">
            <li>
              <strong>One Vote Per Day:</strong> By confirming this vote, you are using your vote for today. You will be able to vote again tomorrow.
            </li>

            <li>
              <strong>Can’t Undo:</strong> Once confirmed, you cannot remove your vote for today. However, you can change your vote to a different design if you browse the gallery again today.
            </li>

            <li>
              <strong>Fair Voting:</strong> Your vote is tracked by your device/browser to ensure fair voting. Each device can vote once per day.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
  <button
    onClick={() => router.push("/voteRecorded")}
    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-black shadow hover:bg-gray-200"
  >
    Confirm My Vote
  </button>

  <button
    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
  >
    Cancel
  </button>
</div>

{/* Back Button */}
<div className="mt-4 flex justify-center sm:justify-start">
  <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-gray-200">
    ← Back to Gallery
  </button>
</div>
</div>
    </section>
  );
}
