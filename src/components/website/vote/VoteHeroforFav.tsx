'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export default function VoteHero() {
  return (
    <section className="relative flex items-center justify-center text-center">
      {/* Content */}
      <div className="relative z-10 px-6 text-white">
        
        <motion.h1
          className="font-['Lilita_One'] text-5xl sm:text-2xl md:text-6xl pt-9 mb-2 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Vote for Your Favourite Design
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold max-w-xs sm:max-w-sm md:max-w-none mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          Browse all submitted lunch bag designs and vote for your <br />
          favorite. Each person can vote once.
        </motion.p>

      </div>
    </section>
  )
}
