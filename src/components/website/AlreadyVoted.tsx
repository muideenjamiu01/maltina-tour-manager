export default function AlreadyVotedSection() {
  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.svg')] opacity-10 pointer-events-none" />

     
      <div className="relative max-w-4xl mx-auto flex flex-col items-center">
        {/* Icon */}
        <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-orange-500">
  <span className="text-white text-6xl font-extrabold">!</span>
</div>

        {/* Heading */}
        <h1 className="text-white text-6xl md:text-7xl font-lilita leading-none mb-2 drop-shadow">
          Looks like you've
          <br />
          already voted
        </h1>

    
        <p className="text-black text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
          Each email and mobile number can only be used once in this competition.
        </p>

        {/* Button */}
        <button className="bg-white text-gray-800 font-medium px-10 py-4 rounded-xl shadow-md hover:bg-gray-100 transition">
          View all finalists
        </button>
      </div>
    </section>
  );
}
