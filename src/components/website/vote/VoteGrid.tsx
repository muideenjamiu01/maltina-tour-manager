import Image from "next/image"
import Link from "next/link"

export default function VoteGrid({ designs }) {
  if (!designs || designs.length === 0) {
    return (
      <section className="py-10">
        <p className="text-center text-gray-500">
          No designs match your selected filters.
        </p>
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <Link
            key={design.id}
            href={`/designerDetails`}
            className="block"
          >
            <div className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={design.image || "/assets/sampleperson.png"}
                alt={design.name}
                width={400}
                height={250}
                className="w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">
                  Design by {design.name}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  {design.category} · {design.zone}
                </p>

                <p className="text-sm text-gray-500">
                  {design.votes} votes
                </p>

                <div className="flex justify-end mt-4">
                  <Link
                    href={`/voteConfirm`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="border border-orange-400 px-3 py-1 rounded-md transition hover:bg-orange-400 hover:text-white">
                      View & Vote
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
