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
  // Big cloud: very slow left → right drift
const cloudVariants: Variants = {
  animate: {
    x: ["0%", "-30%"], // move left only, stays inside view
    transition: {
      duration: 80,
      ease: "linear",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};




const walkIn: Variants = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};



  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        variants={bgFade}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/websites/vote/bg.png"
          alt="Vote for your favourite lunch bag design"
          fill
          priority
          className="object-cover"
          sizes="100vw"
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
            src="/images/websites/vote/orbit.png"
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
    src="/images/websites/vote/smfunnel.png"
    alt="Decorative element"
    fill
    className="object-contain"
  />
</motion.div>


<motion.div
  className="
    absolute
    bottom-[22%]
    right-[-15%]       /* stays right */
    w-[160%]
    h-[500px]
    sm:h-[360px]
    md:h-[420px]
    z-[2]
    pointer-events-none
    opacity-90
  "
  style={{ scale: 1.2 }}
  variants={cloudVariants}
  animate="animate"
>
  <Image
    src="/images/websites/vote/cloud.png"
    alt="Big moving cloud"
    fill
    className="object-contain"
  />
</motion.div>




<motion.div
  className="
    absolute
    bottom-[22%]
    right-[-15%]       /* stays right */
    w-[160%]
    h-[500px]
    sm:h-[360px]
    md:h-[420px]
    z-[2]
    pointer-events-none
    opacity-90
  "
  style={{ scale: 1.2 }}
  variants={cloudVariants}
  animate="animate"
>
  <Image
    src="/images/websites/vote/cloud.png"
    alt="Big moving cloud"
    fill
    className="object-contain"
  />
</motion.div>




      
     {/* ================= BIG BOX (FRONT) ================= 
<motion.div className=" absolute right-[6%] mt-26 w-[450px] sm:w-[560px] 
md:w-[900px] lg:w-[860px] xl:w-[1000px] 2xl:w-[1150px] z-[5] pointer-events-none " > 
{/* BOX IMAGE  <div className="relative z-10 max-sm:mt-65 max-sm:-translate-x-30 max-sm:scale-150">
   <Image src="/images/websites/vote/box2.png" alt="Lunch box" className="w-full h-auto" width={1200} height={1200} priority /> 
   </div>
     LIGHT – CENTERED 
     <motion.div
  className="
    absolute left-1/2 top-50
    -translate-x-80 -translate-y-1/2
    z-50
    w-[80%] h-[60%]
    max-sm:w-[60%] max-sm:h-[40%]
    max-sm:mt-35
    max-sm:-translate-x-40
  "
  animate={{
    opacity: [0.25, 1, 0.25],  // <- full opacity included
    scale: [1, 1.08, 1],
  }}
  transition={{
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity,
  }}
>
  <Image
    src="/assets/light.png"
    alt="Light glow"
    fill
    className="object-contain mix-blend-screen blur-xl"
    priority
  />
</motion.div>
</motion.div>
 */}


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
    text-3xl
    max-sm:text-4xl
    sm:text-3xl
    md:text-4xl   /* smaller on tablet */
    lg:text-5xl   /* keep same desktop size */
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