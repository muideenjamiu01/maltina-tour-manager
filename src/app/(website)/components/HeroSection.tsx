"use client"

export default function HeroSection() {
  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/hero-bus.png)' }}
    >
      
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating decorative blobs */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-24 right-32 w-24 h-24 rounded-full bg-white/20 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full bg-white/10 animate-float delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-white/20 animate-float delay-2000" />
      </div>

      {/* Text content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-40 text-center lg:text-left">
        <h1
          className="text-black leading-tight"
          style={{
            fontFamily: '"Lilita One", sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', // fluid heading
          }}
        >
          The Maltina Nourishment Tour:
        </h1>

        <p
          className="mt-4 text-black/80"
          style={{
            fontFamily: '"Lilita One", sans-serif',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // fluid paragraph
          }}
        >
          Inspiring Future Scientists Across Nigeria
        </p>
      </div>

      {/* Ground fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/40 to-transparent z-40" />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
