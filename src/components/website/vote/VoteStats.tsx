'use client'

import Image from "next/image"
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"

const stats = [
  { label: "Total Design", value: 6 },
  { label: "Total Votes", value: 1381 },
  { label: "States", value: 5 },
]

/* ---------------- COUNTER COMPONENT ---------------- */
function AnimatedCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, latest => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.5,
        ease: "easeOut",
      })
    }
  }, [isInView, value, motionValue])

  return (
    <motion.span
      ref={ref}
      className="font-['Lilita_One'] text-5xl md:text-6xl block leading-none drop-shadow"
    >
      {rounded}
    </motion.span>
  )
}

/* ---------------- MAIN STATS ---------------- */
export default function VoteStats() {
  return (
    <section className="py-10">
      <motion.div
        className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="relative w-36 h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 overflow-hidden flex items-center justify-center mx-auto"
          >
            {/* Background Image */}
            <Image
              src="/images/websites/vote/Stepsbg.png"
              alt="Stats background"
              fill
              priority
              className="object-cover"
            />

            {/* Content */}
            <motion.div
              className="relative z-10 text-white text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-2xl md:text-md max-w-[100px] leading-none block font-bold mb-1">
                {stat.label}
              </span>

              <AnimatedCounter value={stat.value} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
