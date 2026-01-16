import Image from "next/image"
import DesignerDetailCard from "@/components/website/vote/DesignerDetailCard"
import { fetchDesignById } from '@/lib/api/vote'
import { Design } from '@/types/vote.types'
import voteDesigns from '@/data/vote-mock-data'

type Props = {
  // `searchParams` may be a Promise in some Next.js versions; accept any and await it.
  searchParams?: any
}

export default async function DesignerDetail({ searchParams }: Props) {
  const params = await searchParams
  const id = params?.id ? Number(params.id) : undefined
  // Try API first, fall back to in-memory mock data (server-side)
  let design: Design | undefined = undefined
  if (id) {
    try {
      design = await fetchDesignById(id)
    } catch (e) {
      // ignore and fallback
    }
    if (!design) {
      design = voteDesigns.find((d) => d.id === id)
    }
  }

  return (
    <div className="relative min-h-screen">
      <Image
        src="/assets/background.png"
        alt="Vote background"
        fill
        priority
        className="object-cover"
      />
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            {design ? (
              <DesignerDetailCard
                id={design.id}
                image={design.image}
                name={design.name}
                school={design.school}
                zone={design.zone}
                location={design.location}
                dateSubmitted={design.date}
                description={design.story}
                votes={design.votes}
              />
            ) : (
              <div className="bg-white p-6 rounded shadow">No design found.</div>
            )}

            {/* ABOUT VOTING */}
            <div className="mt-10 ">
              <h2 className="font-bold text-black mb-2">About Voting</h2>
              <p className="text-sm text-black  font-semibold leading-relaxed">
                Voting allows you to support your favorite designers. Each vote
                contributes to the final ranking. You may only vote once per design,
                so choose wisely.
              </p>
              <p className="text-sm text-black  font-semibold leading-relaxed">
                One Vote Per Person: Each person can vote once per mobile number. Phone
                verification is required.
              </p>
              <p className="text-sm text-black font-semibold leading-relaxed">
                SMS Verification: You will receive a one-time code via SMS to verify your
                vote.
              </p>
              <p className="text-sm text-black font-semibold leading-relaxed">
                Fair Voting: Our system detects and prevents duplicate voting using email
                and mobile number validation.
              </p>
              <p className="text-sm text-black font-semibold leading-relaxed">
                Winner Selection: The design with the most votes at the end of the
                voting period will be featured on limited edition Maltina lunch bags
                distributed during the tour.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
