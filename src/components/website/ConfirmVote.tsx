import { Link } from "lucide-react";
import Image from "next/image";

export default function ConfirmVoteSection() {
  return (
   <section className="w-full px-4 py-3 pt-35">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-white">
          <h1 className="text-8xl  font-lilita tracking-tight drop-shadow">
            Confirm Your Vote
          </h1>

          <p className="mt-1 opacity-90 text-3xl text-black">
            Review your vote before confirming
          </p>
        </div>

        {/* Voted For */}
        <div className="mt-5">
        <h2 className="mb-1 font-Poppins text-[3.5rem] font-semibold text-black">
  You are voting for:
</h2>


          {/* Card */}
          <div className="overflow-hidden ">
          <div className="grid grid-cols-2 gap-3">

              {/* Image */}
             <div className="relative h-75 w-full md:w-[89%] ">
  <Image
    src="/assets/sampleperson.png"
    alt="Design submission"
    fill
    className="object-cover"
  />
</div>


              {/* Details */}
              <div className="">
                <h3 className="text-5xl font-bold text-black">
                  Design by Blessing N.
                </h3>

                <p className="mt-1 text-2xl font-semibold text-black">
                  Student Information
                </p>

                <div className="mt-4 space-y-2 text-md">
                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="font-xl text-black">Name</span>
                    <span className="text-black">Blessing N.</span>
                  </div>

                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="font-medium text-black">School</span>
                    <span className="text-black">Royal Academy</span>
                  </div>

                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="font-medium text-black">Location</span>
                    <span className="text-black">
                      Ikeja, Lagos State
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-orange-500 pb-2">
                    <span className="font-medium text-black">Zone</span>
                    <span className="text-black">Zone 3</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-black">
                      Submitted
                    </span>
                    <span className="text-gray-800">
                      January 10, 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-7 rounded-xl px-3 py-3 text-md text-black ">
          <h4 className="mb-2 font-bold text-2xl">Important Information</h4>

          <ul className="space-y-2 leading-relaxed">
            <li>
              <strong>One Vote Per Day: By confirming this vote, you are using your vote for today. You will be able to vote again tomorrow.</strong> By confirming this vote,
              you are using your vote for today. You will be able to vote
              again tomorrow.
            </li>

            <li>
              <strong>Can’t Undo:</strong> Once confirmed, you cannot
              remove your vote for today. However, you can change your
              vote to a different design if you browse the gallery again
              today.
            </li>

            <li>
              <strong>Fair Voting:</strong> Your vote is tracked by your
              device/browser to ensure fair voting. Each device can vote
              once per day.
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/voteRecorded" >
  <button className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-black shadow hover:bg-gray-200 transition">
    Confirm My Vote
  </button>
</Link>

          <button className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-black hover:bg-gray-100">
            Cancel
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-4 flex ">
          <button className="rounded-md bg-gray-100 px-6 py-2 text-sm font-medium text-black hover:bg-gray-100">
            ← Back to Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
