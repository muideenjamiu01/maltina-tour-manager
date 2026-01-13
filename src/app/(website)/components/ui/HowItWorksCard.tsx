"use client"

//import HowItWorksCard from "@/components/ui/HowItWorksCard"

export default function HowItWorks() {
  const cards = [
    {
      title: "Nominate a School",
      description:
        "Know a school that can benefit from the Maltina Nourishment Tour? Submit a nomination and help us reach more students.",
      buttonText: "Nominate a School",
      icon: "1",
    },
    {
      title: "Lunch Bag Design Challenge",
      description:
        "Join our creative competition! Design your lunch bag for a chance to win exciting prizes. And inspire healthy eating habits.",
      buttonText: "Submit a design",
      icon: "2",
    },
    {
      title: "Track the Impact",
      description:
        "See where the bus has been and how many children we've reached. Open tour tracker and follow the journey!",
      buttonText: "Open tour tracker",
      icon: "3",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-orange-400 to-orange-500 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white text-center mb-16"
          style={{
            fontFamily: '"Lilita One", sans-serif',
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          How the Tour Works
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <HowItWorksCard
              key={index}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
