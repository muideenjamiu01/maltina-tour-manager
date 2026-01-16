"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export default function VoteHero() {
  // Variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // ✅ Background opacity animation (only addition)
  const bgFade: Variants = {
    hidden: { opacity: 0.2 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

const walkIn: Variants = {
  hidden: {
    opacity: 0,
    x: 120,
    y: -120,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      ease: "easeOut",
      delay: 0.6,
    },
  },
};


  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        variants={bgFade}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/assets/vtbg.png"
          alt="Vote for your favourite lunch bag design"
          fill
          priority
          className="object-cover"
        />
  <motion.div
          className="
            absolute
            right-[4%]
            top-[70%]
            w-[140px]
            h-[140px]
            sm:w-[160px]
            sm:h-[160px]
            md:w-[180px]
            md:h-[180px]
            pointer-events-none
          "
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Image
            src="/assets/orbit.png"
            alt="Orbiting planet"
            fill
            className="object-contain"
          />
        </motion.div>

                
      <motion.div
  className="
    absolute
    top-[15%]
    right-[2%]
    w-[120px] h-[120px]
    sm:w-[150px] sm:h-[150px]
    md:w-[180px] md:h-[180px]
    lg:w-[220px] lg:h-[220px]
    pointer-events-none
  "
  variants={walkIn}
  initial="hidden"
  animate="visible"
>
  <Image
    src="/assets/smfunnel.png"
    alt="Decorative element"
    fill
    className="object-contain"
  />
</motion.div>


        {/* Content */}
        <motion.div
          className="
            relative z-10 md:ml-0 mt-35
            max-sm:mt-20
            max-sm:text-center
          "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
            <div className="w-full pt-40 max-sm:pt-6">
              <motion.h1
                className="
                  font-lilita
                  text-black
                  text-3xl max-sm:text-4xl sm:text-3xl md:text-7xl lg:text-5xl
                  leading-tight
                  text-left
                  max-sm:text-center
                  mb-5
                  drop-shadow-md
                "
                variants={fadeUp}
              >
                Vote for Your/Favourite
                <br />
                Lunch Bag Design
              </motion.h1>

              <motion.p
                className="
                  font-['Lilita_One']
                  text-black
                  text-base max-sm:text-lg sm:text-base md:text-lg lg:text-3xl
                  max-w-[300px] sm:max-w-[430px] lg:max-w-[500px] xl:max-w-[800px
                  leading-tight
                  mb-1
                  pt-2
                  max-sm:mx-auto
                "
                variants={fadeUp}
              >
                Help us choose 6 winning designs, one from each geo-political
                zone across Nigeria.
              </motion.p>

              <motion.p
                className="
                  font-['Poppins']
                  text-black
                  text-sm sm:text-base lg:text-xl
                  max-w-[350px] sm:max-w-[480px]
                  mb-6
                  max-sm:mx-auto
                "
                variants={fadeUp}
              >
                Your vote will decide which lunch bag designs get produced and
                distributed to schools in the Maltina Nourishment Tour.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
