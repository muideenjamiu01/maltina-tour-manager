const winners = [
  {
    name: "Aisha K.",
    age: "Age 12 | Lagos",
    school: "Government Primary School",
    image: "/images/winners/aisha.jpg",
  },
  {
    name: "Chidi O.",
    age: "Age 10 | Enugu",
    school: "Community Secondary School",
    image: "/images/winners/chidi.jpg",
  },
  {
    name: "Emeka N.",
    age: "Age 11 | Kano",
    school: "Unity Primary School",
    image: "/images/winners/emeka.jpg",
  },
  {
    name: "Bola A.",
    age: "Age 9 | Ibadan",
    school: "St. Mary’s Secondary",
    image: "/images/winners/bola.jpg",
  },
  {
    name: "Mariam O.",
    age: "Age 8 | Akure",
    school: "Hope Academy",
    image: "/images/winners/mariam.jpg",
  },
  {
    name: "Umar K.",
    age: "Age 11 | Sokoto",
    school: "Federal Government College",
    image: "/images/winners/umar.jpg",
  },
];

export default function MeetTheWinners() {
  return (
    <main className="bg-gradient-to-b from-orange-400 to-orange-500 py-20 px-6 text-center">
      {/* HERO */}
      <section className="max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Meet the Winners
        </h1>
        <p className="text-white/90 text-base leading-relaxed">
          These are the winning lunch bag designs from each geo-political zone.
          <br />
          Voting has now closed.
        </p>
      </section>

      {/* WINNERS GRID */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {winners.map((winner, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <img
              src={winner.image}
              alt={winner.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <h3 className="text-lg font-bold text-gray-900">
              {winner.name}
            </h3>

            <p className="text-xs text-gray-400 mt-1">{winner.age}</p>

            <p className="text-sm text-gray-600 mb-4">
              {winner.school}
            </p>

            <button className="border border-orange-500 text-orange-500 px-5 py-1.5 rounded-full text-sm hover:bg-orange-500 hover:text-white transition">
              View & Vote
            </button>
          </div>
        ))}
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-white text-orange-500 font-semibold px-8 py-3 rounded-full shadow hover:bg-orange-50 transition">
          Download winners pack (PDF)
        </button>

        <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 transition">
          View all finalists again
        </button>
      </section>
    </main>
  );
}
