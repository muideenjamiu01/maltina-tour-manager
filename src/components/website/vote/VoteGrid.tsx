import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Design } from "@/types/vote.types";
import VoteModal from '@/components/website/vote/vote-modal';

type VoteGridProps = {
  designs: Design[];
};

export default function VoteGrid({ designs }: VoteGridProps) {
   const [showVoteModal, setShowVoteModal] = useState(false);
  if (!designs || designs.length === 0) {
    return (
      <section className="py-16">
        <p className="text-center text-gray-500">
          No designs match your selected filters.
        </p>
      </section>
    );
  }

  return (
    <section className="py- sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <Link
            key={design.id}
            href={`/vote/designerDetails?id=${design.id}`}
            className="group block bg-white overflow-hidden shadow hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden group">
              <Image
                src={design.image || "/images/websites/vote/aboy_.png"}
                alt={design.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Hover Summary Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center p-4 transition-opacity duration-200">
                <p className="text-white text-sm leading-relaxed text-center">
                  {design.summary ||
                    `Discover this beautiful design created by ${design.name}. Click to view full details and cast your vote!`}
                </p>
              </div>

              {/* Child Thumbnail Overlay */}
              {design.childImageUrl && (
                <div className="absolute bottom-3 right-3 w-16 h-16 rounded-xl border-4 border-yellow-400 overflow-hidden shadow-lg">
                  <Image
                    src={design.childImageUrl}
                    alt="Child preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-lg">Design by {design.name}</h3>

              <p className="text-sm text-gray-600">
                {design.category} · {design.zone}
              </p>

              <p className="text-sm text-gray-500">{design.votes} votes</p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowVoteModal(true);
                  }}
                  className="border border-orange-400 text-orange-500 px-3 py-1.5 rounded-md text-sm font-medium transition hover:bg-orange-400 hover:text-white"
                >
                  View & Vote
                </button>
              </div>
            </div>
          </Link>
        ))}
         {/* Vote Modal */}
              {showVoteModal && (
                <VoteModal onClose={() => setShowVoteModal(false)} />
              )}
      </div>
    </section>
  );
}
