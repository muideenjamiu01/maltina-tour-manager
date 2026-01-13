export default function IntroSection() {
  return (
    <section className="relative px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto text-center">

        {/* Heading */}
        <h2 className="font-lilita text-white 
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          lg:text-6xl 
          xl:text-7xl 
          mb-4 md:mb-6">
          Join The Maltina Nourishment Tour
        </h2>

        {/* Subheading */}
        <p className="font-poppins font-semibold text-[#292526] 
          text-base 
          sm:text-lg 
          md:text-xl 
          lg:text-2xl 
          mb-8">
          Together, we're nourishing futures across Nigeria.
        </p>

        {/* Body text */}
        <div className="max-w-4xl mx-auto space-y-4 
          font-poppins text-[#292526] 
          text-sm 
          sm:text-base 
          md:text-lg 
          lg:text-xl">
          <p>
            The Maltina Nourishment Tour is bringing back the excitement of science and
            discovery to schools across Nigeria. With our fun TV show, nationwide school
            roadshow, and hands-on science challenges, we're making learning enjoyable
            again and showing children that when both mind and body are nourished, they
            can achieve anything.
          </p>

          <p>
            All over Nigeria, we're inspiring classrooms, fuelling lunchboxes, and sparking
            young imaginations with one clear message: Maltina is here to nourish the future.
          </p>
        </div>

      </div>
    </section>
  );
}
