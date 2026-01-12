import Image from "next/image"

export default function VoteHero() {
  return (
    <section className="relative flex items-center justify-center text-center">


      {/* Content */}
      <div className="relative z-10  px-6 text-white  ">
        <h1 className="font-['Lilita_One'] text-7xl sm:text-4xl md:text-7xl  pt-9 mb-4 drop-shadow-md">
          Vote for Your Favourite Design
        </h1>
        <p className="text-7xl sm:text-lg md:text-3xl text-black  font-bold ">
         Browse all submitted lunch bag designs and vote for your <br />favorite. Each person can vote once.
        </p>
      </div>
    </section>
  )
}
