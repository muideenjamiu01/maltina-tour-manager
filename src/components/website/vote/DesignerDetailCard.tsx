import Image from "next/image"
import Link from "next/link"

interface DesignerDetailCardProps {
  image: string
  name: string
  school?: string
  zone?: string
  location?: string
  dateSubmitted?: string
  description?: string
  votes: number
  id?: number
}

export default function DesignerDetailCard({
  image,
  name,
  school,
  zone,
  location,
  dateSubmitted,
  description,
  votes,
  id,
}: DesignerDetailCardProps) {
  return (
    <div className="w-full">

      {/* BACK BUTTON */}
      <Link
        href="/vote/voteforFavourite"
        className="inline-flex items-center gap-2 mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
      >
        ← Back to all Finalists
      </Link>

      {/* MAIN LAYOUT */}
      <div className="grid md:grid-cols-[340px_1fr] gap-10 items-start">

        {/* LEFT CARD */}
        <div className="bg-white  shadow-lg overflow-hidden relative">

          {/* IMAGE (NO PADDING) */}
          <div className="relative h-[300px] w-full">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          {/* DESIGNER INFO */}
          <div className="px-5 py-8">
            <h3 className="font-semibold text-gray-900">
              {name}
            </h3>
            <p className="text-sm text-gray-600">
              {school || '—'}
            </p>
            <p className="text-sm text-gray-500">
              Zone: {zone}
            </p>
          </div>

          {/* CARD ACTIONS (BOTTOM RIGHT) */}
          <div className="flex justify-end gap-3 px-5 pb-4">
            <button className="text-sm font-medium border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
              View & vote
            </button>
           
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
             <h1 className="text-4xl font-semibold mb-2 ">
            Design by {name}
          </h1>
          <h3 className="text-2xl font-semibold mb-1">
            Student Information
          </h3>

          {/* INFO ROWS */}
          <div className="space-y-5 text-sm">

            <div>
              <div className="flex justify-between">
                <span className="text-black">Name</span>
                <span>{name}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">School</span>
                <span className="font-medium">{school || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">Location</span>
                <span className="font-medium">{location || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">Zone</span>
                <span className="font-medium">{zone || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">Date Submitted</span>
                <span className="font-medium">{dateSubmitted || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 mb-4" />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mb-1 max-w-2xl">
            <h3 className="font-semibold">
              Design Description
            </h3>
            <p className="text-sm text-black leading-relaxed">
              {description || 'No description provided.'}
            </p>
          </div>

          {/* VOTING SECTION */}
          <div className="flex flex-col items-start gap-1">
             <p className="text-md ">
              Current Votes:
            </p>
            <p className="text-md ">
               {votes}  <span className="text-black italic ml-30">
    You haven’t voted yet
  </span>
            </p>
            
<Link href={id ? `/vote/voteConfirm?id=${id}` : '/vote/voteConfirm'} passHref>
  <button className="bg-gray-200 transition text-black px-8 py-3 rounded-md hover:bg-gray-300">
    Vote for this Design
  </button>
</Link>

           
          </div>

        </div>
      </div>
    </div>
  )
}
