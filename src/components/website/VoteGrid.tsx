import Image from "next/image"
import Link from "next/link"

const designs = Array.from({ length: 6 })

export default function VoteGrid() {
  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {designs.map((_, i) => (
          <div
            key={i}
            className="bg-white  shadow hover:shadow-lg transition"
          >
            <Image
              src="/assets/sampleperson.png"
              alt="Design"
              width={400}
              height={250}
              className="rounded-t-lg object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">
                Design by Student {i + 1}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Creative lunch bag design
              </p>
<div className="flex justify-end mt-4">
  <Link href="/designerDetails" passHref>
    <button className="border border-orange-400 bg-gray text-black px-3 py-1 rounded-md transition hover:bg-orange-400 hover:text-white">
      View & Vote
    </button>
  </Link>
</div>


            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
