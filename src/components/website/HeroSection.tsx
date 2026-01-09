"use client";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFC347]">
      {/* Background curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 40C120 80 360 120 720 120C1080 120 1320 80 1440 40V120H0V40Z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-52">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* Text */}
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#1E1E1E] leading-tight">
              The Maltina Nourishment Tour:
            </h1>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-[#1E1E1E]">
              Inspiring Future Scientists Across Nigeria
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full h-auto">
            <img
              src="/hero-bus.png"
              alt="Maltina Nourishment Tour Bus"
              className="w-full h-auto scale-110 translate-y-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
