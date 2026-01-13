const winners = [
  {
    name: "Aisha K.",
    age: "Age 12 | Lagos",
    zone: "South West",
    school: "Government Primary School",
    image: "/assets/sampleperson.png",
  },
  {
    name: "Chidi O.",
    age: "Age 10 | Enugu",
    zone: "South East",
    school: "Community Secondary School",
    image: "/images/winners/chidi.jpg",
  },
  {
    name: "Emeka N.",
    age: "Age 11 | Kano",
    zone: "North West",
    school: "Unity Primary School",
    image: "/images/winners/emeka.jpg",
  },
  {
    name: "Bola A.",
    age: "Age 9 | Ibadan",
    zone: "South West",
    school: "St. Mary’s Secondary",
    image: "/images/winners/bola.jpg",
  },
  {
    name: "Mariam O.",
    age: "Age 8 | Akure",
    zone: "South West",
    school: "Hope Academy",
    image: "/images/winners/mariam.jpg",
  },
  {
    name: "Umar K.",
    age: "Age 11 | Sokoto",
    zone: "North West",
    school: "Federal Government College",
    image: "/images/winners/umar.jpg",
  },
];


export default function MeetTheWinners() {
  return (
    <main className=" py-20 px-6 text-center">
      {/* HERO */}
      <section className="max-w-3xl mx-auto mb-16">
        <h1 className="text-6xl md:text-6xl font-lilita text-white mb-4 drop-shadow-md">
          Meet the Winners
        </h1>
        <p className="text-black text-base leading-relaxed">
          These are the winning lunch bag designs from each geo-political zone.
          <br />
          Voting has now closed.
        </p>
      </section>

      {/* WINNERS GRID */}
<section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
  {winners.map((winner, index) => (
    <div
      key={index}
      className="bg-white overflow-hidden flex flex-col"
    >
      {/* Image */}
      <img
        src={winner.image}
        alt={winner.name}
        className="w-full h-64 object-cover"
      />

      {/* Footer */}
      <div className="px-4 py-4 bg-gray-50 mt-auto text-left">
        
        {/* Zone */}
        <p className="inline-block text-xs font-medium border border-orange-500 text-black px-3 py-1 mb-2">
          {winner.zone}
        </p>

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
          {winner.name}
        </h3>

        {/* Age */}
        <p className="text-xs text-gray-500 leading-tight mb-3">
          {winner.age}
        </p>

        {/* Centered Button */}
       <div className="flex justify-center">
  <button className="border border-orange-500 text-black px-6 py-1.5 text-[11px] font-semibold hover:bg-orange-500 hover:text-white transition rounded-md">
    View & Vote
  </button>
</div>
      </div>
    </div>
  ))}
</section>


      {/* ACTION BUTTONS */}
  <section className="flex flex-col sm:flex-row justify-center gap-4">
  <button className="bg-gray-200 text-black w-full sm:w-auto px-9 py-6 rounded-md shadow hover:bg-orange-50 transition">
    Download winners pack (PDF)
  </button>

  <button className="bg-gray-200 border-2 border-gray-200 text-black w-[70%] sm:w-auto px-9 py-6 rounded-md hover:bg-white hover:text-black transition">
    View all finalists again
  </button>
</section>

    </main>
  );
}
