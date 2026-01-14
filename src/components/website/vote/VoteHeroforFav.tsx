import Image from "next/image"

export default function VoteHero() {
  return (
    <section className="relative flex items-center justify-center text-center">


      {/* Content */}
      <div className="relative z-10  px-6 text-white  ">
        <h1 className="font-['Lilita_One'] text-5xl sm:text-2xl   md:text-6xl pt-9 mb-2 drop-shadow-md">
          Vote for Your Favourite Design
        </h1>
<p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold max-w-xs sm:max-w-sm md:max-w-none mx-auto">
         Browse all submitted lunch bag designs and vote for your <br />favorite. Each person can vote once.
        </p>
      </div>
    </section>
  )
}
