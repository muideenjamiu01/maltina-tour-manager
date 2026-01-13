"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function VoteHero() {
  // Variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // stagger the children animations
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[90vh] flex overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px]">
        <Image
          src="/assets/vtbg.png"
          alt="Vote for your favourite lunch bag design"
          fill
          priority
          className="object-cover"
        />

        {/* Content */}
        <motion.div
          className="relative z-10 md:ml-0 mt-35"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
            <div className="w-full pt-15">
              <motion.h1
                className="font-['Lilita_One'] text-black text-2xl sm:text-3xl md:text-7xl lg:text-5xl leading-tight text-left mb-5 drop-shadow-md"
                variants={fadeUp}
              >
                Vote for Your/Favourite
                <br />
                Lunch Bag Design
              </motion.h1>

              <motion.p
                className="font-['Lilita_One'] text-black text-sm sm:text-base md:text-lg lg:text-3xl max-w-[450px] leading-tight mb-3 pt-2"
                variants={fadeUp}
              >
                Help us choose 6 winning designs, one from each geo-political
                zone across Nigeria.
              </motion.p>

              <motion.p
                className="font-['Poppins'] text-black text-sm sm:text-base lg:text-xl max-w-[450px] mb-6"
                variants={fadeUp}
              >
                Your vote will decide which lunch bag designs get produced and
                distributed to schools in the Maltina Nourishment Tour.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
