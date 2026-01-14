import Image from "next/image"

const stats = [
  { label: "Total Design", value: "6" },
  { label: "Total Votes", value: "1381" },
  { label: "States", value: "5" },
  { label: "Days Left", value: "14" },
]

export default function VoteStats() {
  return (
    <section className="py-10">
     <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative w-36 h-36 md:w-40 md:h-40 lg:w-44 lg:h-44  overflow-hidden flex items-center justify-center mx-auto"
          >
            {/* Background Image */}
            <Image
              src="/assets/Stepsbg.png"
              alt="Stats background"
              fill
              priority
              className="object-cover"
            />

         

            {/* Content */}
            <div className="relative z-10 text-white text-center">
                 <span className="text-2xl md:text-md max-w-[100px]  leading-none block font-bold">
                {stat.label}
              </span>
              <span className="font-['Lilita_One'] text-5xl md:text-6xl block leading-none drop-shadow">
                {stat.value}
              </span>
             
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
