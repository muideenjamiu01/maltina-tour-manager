import Image from "next/image";

export default function ConfirmVoteSection() {
  return (
    <section className="w-full bg-gradient-to-b from-yellow-400 via-orange-400 to-orange-500 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Confirm Your Vote
          </h1>

          <p className="mt-2 text-sm opacity-90">
            Review your vote before confirming
          </p>
        </div>

        {/* Voted For */}
        <div className="mt-10">
          <h2 className="mb-6 text-center text-lg font-bold text-white">
            You are voting for:
          </h2>

          {/* Card */}
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 w-full md:h-full">
                <Image
                  src="/design-sample.jpg"
                  alt="Design submission"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-600">
                  Design by Blessing N.
                </h3>

                <p className="mt-1 text-sm font-semibold text-gray-700">
                  Student Information
                </p>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium text-gray-600">Name</span>
                    <span className="text-gray-800">Blessing N.</span>
                  </div>

                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium text-gray-600">School</span>
                    <span className="text-gray-800">Royal Academy</span>
                  </div>

                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium text-gray-600">Location</span>
                    <span className="text-gray-800">
                      Ikeja, Lagos State
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-1">
                    <span className="font-medium text-gray-600">Zone</span>
                    <span className="text-gray-800">Zone 3</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
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
        <div className="mt-10 rounded-xl bg-orange-600 px-6 py-5 text-sm text-white shadow">
          <h4 className="mb-2 font-bold">Important Information</h4>

          <ul className="space-y-2 leading-relaxed">
            <li>
              <strong>One Vote Per Day:</strong> By confirming this vote,
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
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="rounded-md bg-white px-6 py-2 text-sm font-medium text-orange-600 shadow hover:bg-gray-100">
            Confirm My Vote
          </button>

          <button className="rounded-md bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100">
            Cancel
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-4 flex justify-center">
          <button className="rounded-md bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100">
            ← Back to Gallery
          </button>
        </div>
      </div>
    </section>
  );
}
