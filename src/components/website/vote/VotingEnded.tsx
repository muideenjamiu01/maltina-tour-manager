import { Check } from "lucide-react";

export default function VotingEnded() {
  return (
    <main className="min-h-screen flex justify-center px-2 py-16">
   <section className="w-full max-w-6xl text-white"> 
  {/* Icon */}
  <div className="flex justify-center mb-3">
    <div className="w-24 h-24 sm:w-30 sm:h-30 md:w-30 md:h-30 rounded-full bg-orange-500 flex items-center justify-center">
      <Check className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" strokeWidth={3} />
    </div>
  </div>

  {/* Headings */}
  <h1 className="text-3xl sm:text-4xl md:text-7xl font-lilita text-white text-center drop-shadow mb-4">
    Voting Has Ended
  </h1>

  {/* Description */}
  <h2 className="text-black text-lg sm:text-xl md:text-2xl text-center mb-6">
    Thank you to everyone who voted for their favorite lunch bag design!
  </h2>

  <h2 className="text-lg sm:text-xl md:text-4xl text-black font-semibold mb-2 text-center sm:text-left">
    Public Voting Closed
  </h2>
  <p className="text-base sm:text-lg md:text-2xl text-black leading-relaxed mb-2 text-center sm:text-left">
    The public voting period ended on October 31, 2024. We are no longer accepting votes for this year’s competition.
  </p>

  {/* Separator */}
  <div className="h-1 bg-orange-600 rounded mx-auto mb-4" />

  {/* What happens next */}
  <h3 className="text-lg sm:text-xl md:text-2xl text-black font-semibold mb-6 text-center sm:text-left">
    What Happens Next
  </h3>
  <ol className="text-center sm:text-left text-sm sm:text-base md:text-2xl list-decimal list-inside space-y-2 sm:space-y-3 mb-10 text-black leading-relaxed">
    <li>Our team is currently tallying all votes.</li>
    <li>Combining public votes with judges’ scores.</li>
    <li>Verifying winners and preparing announcements.</li>
    <li>Winners will be announced on November 15, 2024.</li>
  </ol>

  <div className="h-1 bg-orange-600 rounded mx-auto mb-4" />

  <h3 className="text-xl sm:text-2xl md:text-3xl text-black font-semibold mb-4 text-center sm:text-left">
    View All Designs
  </h3>
  <p className="text-lg sm:text-xl md:text-3xl text-black mb-6 text-center sm:text-left">
    You can still browse all the amazing finalist designs submitted by talented young artists.
  </p>
        {/* Voting summary */}
     {/* Voting summary */}
<h3 className="text-2xl sm:text-3xl text-black font-semibold mb-4 text-center sm:text-left">
  Voting Summary
</h3>

<div className="flex flex-col items-center sm:flex-row justify-center gap-4 sm:gap-6 flex-wrap mb-12">

  {/* Total Votes */}
  <div className="relative w-40 sm:w-auto aspect-[1/1] md:w-48 md:h-48 lg:w-52 lg:h-52">
    <img
      src="/assets/stepsbg.png"
      alt="Total Votes"
      className="w-full h-full object-cover rounded"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
      <span className="text-sm sm:text-md md:text-xl font-semibold text-white leading-none">
        Total<br />Votes Cast
      </span>
      <span className="text-5xl sm:text-3xl md:text-5xl lg:text-7xl font-lilita text-white drop-shadow-md">
        12,643
      </span>
    </div>
  </div>

  {/* Finalists */}
  <div className="relative w-40 sm:w-auto aspect-[1/1] md:w-48 md:h-48 lg:w-52 lg:h-52">
    <img
      src="/assets/stepsbg.png"
      alt="Finalists"
      className="w-full h-full object-cover rounded"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
      <span className="text-sm sm:text-md md:text-xl font-semibold text-white leading-none">
        Finalist<br />Designs
      </span>
      <span className="text-5xl sm:text-2xl md:text-5xl lg:text-6xl font-lilita text-white drop-shadow-md">
        20
      </span>
    </div>
  </div>

  {/* Designs */}
  <div className="relative w-40 sm:w-auto aspect-[1/1] md:w-48 md:h-48 lg:w-52 lg:h-52">
    <img
      src="/assets/stepsbg.png"
      alt="Designs"
      className="w-full h-full object-cover rounded"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2">
      <span className="text-sm sm:text-md md:text-xl font-semibold text-white leading-none">
        State<br />Represented
      </span>
      <span className="text-5xl sm:text-3xl md:text-5xl lg:text-6xl font-lilita text-white drop-shadow-md">
        36
      </span>
    </div>
  </div>

</div>


        {/* Buttons */}
     <div className="flex flex-col sm:flex-row gap-4 mb-16 items-center">

  <button className="bg-gray-200 text-black font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow hover:bg-orange-50 transition text-center mx-auto sm:mx-0">
    Browse All Finalist Design
  </button>

  <button className="bg-gray-200 border border-white text-black font-semibold px-6 py-3 sm:px-4 sm:py-4 rounded-lg hover:bg-white/10 transition text-center mx-auto sm:mx-0">
    Track the Tour
  </button>

</div>


        {/* Articles / info section */}
     <div className="mx-auto space-y-10 text-center sm:text-left">
  <h4 className="text-xl sm:text-2xl font-bold mb-2 text-black">
    Stay Updated
  </h4>
  <p className="text-base sm:text-lg md:text-2xl text-black leading-relaxed opacity-95">
    Don’t miss the winner announcement. Follow us on social media or subscribe to our newsletter.
  </p>

  <ul className="list-disc list-inside space-y-2 leading-relaxed text-black opacity-95 text-sm sm:text-base md:text-2xl">
    <li>Winner announcement on November 15, 2024</li>
    <li>Behind-the-scenes content</li>
    <li>Highlights from the Maltina Nourishment Tour</li>
    <li>Next year’s competition announcements</li>
  </ul>
</div>

<div className="flex justify-center mt-10">
  <button className="bg-gray-200 border border-white text-black font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-white/10 transition w-auto text-center">
    Back to Home
  </button>
</div>


<div className="flex justify-center mt-10">
  <button className="bg-gray-200 border border-white text-black font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-white/10 transition sm:w-auto text-center">
    Back to Home
  </button>
</div>

      </section>
    </main>
  );
}
