import { CheckCircle } from "lucide-react";

export default function VotingEnded() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-400 to-orange-500 flex justify-center px-4 py-20">
      <section className="w-full max-w-4xl text-center text-white">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16" strokeWidth={2.5} />
        </div>

        {/* Headings */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Voting Has Ended
        </h1>

        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Public Voting Closed
        </h2>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-base leading-relaxed opacity-95 mb-10">
          Thank you to everyone who voted for their favorite lunch bag designs.
          The public voting period ended on October 31, 2024. We are no longer
          accepting votes for this year’s competition.
        </p>

        {/* Separator */}
        <div className="w-20 h-1 bg-amber-200 rounded mx-auto mb-10" />

        {/* What happens next */}
        <h3 className="text-2xl font-bold mb-6">
          What Happens Next
        </h3>

        <ol className="max-w-lg mx-auto text-left list-decimal list-inside space-y-3 mb-14 text-base leading-relaxed">
          <li>Our team is currently tallying all votes.</li>
          <li>Combining public votes with judges’ scores.</li>
          <li>Verifying winners and preparing announcements.</li>
          <li>Winners will be announced on November 15, 2024.</li>
        </ol>

        {/* Voting summary */}
        <div className="flex justify-center gap-6 md:gap-8 flex-wrap mb-12">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-6 min-w-[160px]">
            <span className="block text-3xl font-bold">12,643</span>
            <span className="block text-sm mt-1 opacity-90">
              Total Votes
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-6 min-w-[160px]">
            <span className="block text-3xl font-bold">20</span>
            <span className="block text-sm mt-1 opacity-90">
              Finalists
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-8 py-6 min-w-[160px]">
            <span className="block text-3xl font-bold">36</span>
            <span className="block text-sm mt-1 opacity-90">
              Designs
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          <button className="bg-white text-orange-500 font-semibold px-8 py-3 rounded-full shadow hover:bg-orange-50 transition">
            Browse All Finalist Designs
          </button>

          <button className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition">
            Back to Home
          </button>
        </div>

        {/* Articles / info section */}
        <div className="max-w-3xl mx-auto text-left space-y-10">
          <article>
            <h4 className="text-xl font-bold mb-2">
              Stay Updated
            </h4>
            <p className="text-base leading-relaxed opacity-95">
              Don’t miss the winner announcement. Follow us on social media or
              subscribe to our newsletter for updates, behind-the-scenes
              content, and highlights from the competition.
            </p>
          </article>

          <article>
            <h4 className="text-xl font-bold mb-2">
              Winner Announcement
            </h4>
            <p className="text-base leading-relaxed opacity-95">
              The winning designs will be revealed on November 15, 2024. We’ll
              showcase the top entries, share insights from the judges, and
              celebrate the creative talent behind this year’s finalists.
            </p>
          </article>

          <article>
            <h4 className="text-xl font-bold mb-2">
              Thank You for Participating
            </h4>
            <p className="text-base leading-relaxed opacity-95">
              Your votes help support emerging designers and bring innovative
              ideas to life. We appreciate everyone who took part and helped
              make this competition a success.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
