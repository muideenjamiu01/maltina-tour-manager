export default function CallToAction() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: "#FBDF0A" }}>
      <div className="max-w-3xl mx-auto">
        <h3
          className="text-4xl sm:text-5xl lg:text-6xl font-bold"
          style={{
            fontFamily: '"Lilita One", sans-serif',
            color: "#292526",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
          }}
        >
          Sign up your child or their school to be part of the journey today
        </h3>

        <button className="mt-12 px-8 py-4 bg-orange-600 text-white text-lg font-bold rounded-full hover:bg-orange-700 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  )
}
