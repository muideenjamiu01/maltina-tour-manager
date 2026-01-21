"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import CountdownTimer from '@/components/website/vote/countdown-timer';

const steps = [
  {
    number: "1",
    title: "Browse Finalists",
    text: "View 18 shortlisted designs from talented children across Nigeria’s 6 zones.",
  },
  {
    number: "2",
    title: "Cast Your Vote",
    text: "Select your favourite design and submit your vote. One vote per person.",
  },
  {
    number: "3",
    title: "Winners Announced",
    text: "The design with the most votes in each zone wins and goes into production.",
  },
];

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2 });
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const stepVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function HowToVote() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      // Cleanup Lenis
      lenis.destroy();
    };
  }, []);

  return (
    <section className="relative w-full min-h-[40vh] overflow-hidden bg-[#f6a623]">
      {/* Background texture */}
      <Image
        src="/images/websites/vote/background.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Maltina bottle – FIXED POSITION */}
      <div className="absolute bottom-[-700px] right-[-600px] z-10 hidden lg:block pointer-events-none">
        <Image
          src="/images/websites/vote/source_33cl.png"
          alt="Maltina Bottle"
          width={2000}
          height={1500}
          priority
          className="object-contain"
        />
      </div>
       {/* Countdown Timer Section */}
      <section className="bg-white/10 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className=" font-lilita  text-center text-2xl sm:text-3xl text-white mb-6 drop-shadow-md">
            Voting Ends In
          </h2>
          <CountdownTimer />
        </div>
      </section>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-9 pb-24 text-white">
        <motion.h1
          className="font-lilita relative z-10 flex flex-col items-center text-center text-5xl md:text-7xl drop-shadow-md"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: false }}
        >
          How Voting Works
        </motion.h1>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-20">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              className="flex justify-center"
              initial="hidden"
              whileInView="visible"
              variants={stepVariant}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.5 }}
            >
              <div className="relative w-[300px] h-[300px] ">
                {/* Step background image */}
                <Image
                  src="/images/websites/vote/Stepsbg.png"
                  alt="Step background"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Step content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pt-10">
                  <span className="absolute top-1 -mt-3 font-lilita text-8xl leading-none drop-shadow-md">
                    {step.number}
                  </span>

                  <div className="max-w-[170px]">
                    <h3 className="font-Poppins mt-3 font-bold text-2xl leading-none">
                      {step.title}
                    </h3>

                    <p className="text-lg md:text-xl lg:text-sm leading-tight mt-2">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Voting Rules */}
        <div className="mt-20">
          <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-10">
            <div className="max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-black">
              <h4 className="font-bold mb-3 text-2xl">Voting Rules</h4>
              <ul className="list-disc pl-5 space-y-3 text-xl">
                <li>One vote per person across all zones</li>
                <li>6 winners will be selected – one from each geo-political zone</li>
                <li>Voting opens: [Start Date] and closes: [End Date]</li>
                <li>Winners will be announced on: [Announcement Date]</li>
                <li>All votes are final and cannot be changed once submitted</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/vote/finalist"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full shadow-md hover:bg-orange-100 transition"
          >
            View all Finalist
          </Link>
        </div>
      </div>
    </section>
  );
}
