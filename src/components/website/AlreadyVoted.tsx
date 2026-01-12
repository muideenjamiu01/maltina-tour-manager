export default function AlreadyVotedSection() {
  return (
    <section className="relative bg-gradient-to-b from-yellow-400 to-orange-400 px-6 py-24 text-center overflow-hidden">
      {/* Decorative background swirl (optional but matches UI feel) */}
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.svg')] opacity-10 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-full bg-orange-500">
          <span className="text-white text-3xl font-extrabold">!</span>
        </div>

        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Looks like you've
          <br />
          already voted
        </h1>

        {/* Description */}
        <p className="text-white/90 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
          Each email and mobile number can only be used once in this competition.
        </p>

        {/* Button */}
        <button className="bg-white text-gray-800 font-medium px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
          View all finalists
        </button>
      </div>
    </section>
  );
}
