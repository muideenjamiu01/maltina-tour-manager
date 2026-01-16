'use client'
import HeroImage from '@/assets/images/landing-page/hero-image.png'
import Image from 'next/image'
import landingPageImage from '@/assets/images/landing-page/landing-page.png'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useState } from 'react'
import StatsCard1 from '@/assets/images/landing-page/Group 3.png'
import StatsCard2 from '@/assets/images/landing-page/Group 8.png'
import StatsCard3 from '@/assets/images/landing-page/Group 10.png'
import swillImage from '@/assets/images/landing-page/swirl.png'
import mailtinaBottle from '@/assets/images/landing-page/Clip path group.png'
import mobileHeroImage from '@/assets/images/landing-page/mobile-hero.png'
import Lenis from "@studio-freight/lenis";
import { useEffect } from 'react'

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2 });
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const popUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const page = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 0.2, wheelMultiplier: 1 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Set initial window dimensions
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    // Update dimensions on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <header className='sticky top-0 z-0 h-[500px] md:h-screen'>
        <img
          className={`w-full max-[500px]:hidden object-fit h-[${windowHeight}px] absolute top-0 left-0`}
          src={'/images/websites/home/hero/bus3.png'} alt="Hero Image"
        />
        <motion.img
          className={`w-[600px] max-[500px]:hidden object-cover h-[1000px] absolute bottom-[-500px] left-0`}
          src={'/images/websites/home/hero/grass.png'} alt="Hero Image"
          animate={{ y: [0, 0, 0], height: [1000, 1050, 1000] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          className={`w-[150px] z-20 object-cover h-[150px] absolute bottom-[100px] left-[20%]`}
          src={'/images/websites/home/hero/orbit.png'} alt="Hero Image"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src="/images/websites/home/hero/cloud.png"
          alt="Hero Image"
          className="w-[450px] max-[500px]:hidden h-[350px] object-cover z-10 absolute bottom-[10px] left-[0%]"
          style={{ transformOrigin: "top" }}
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.img
          src="/images/websites/home/hero/balon.png"
          alt="Hero Image"
          className="w-[150px] h-[150px] object-cover z-10 absolute top-[150px] left-[40%]"
          style={{ transformOrigin: "top" }}
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.img
          src="/images/websites/home/hero/magnet.png"
          alt="Hero Image Magnet"
          className="w-[650px] h-[200px] max-[500px]:hidden object-fit z-30 absolute top-[200px] left-[40%]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src="/images/websites/home/hero/book.png"
          alt="Hero Image Magnet"
          className="w-[250px] max-[500px]:hidden h-[250px] object-fit z-40 absolute top-[200px] left-[35%]"
          animate={{ scale: [0.7, 1.4, 0.7] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src="/images/websites/home/hero/small color pant.png"
          alt="Hero Image Magnet"
          className="w-[100px] max-[500px]:hidden h-[100px] object-fit z-40 absolute top-[280px] right-[2%]"
          animate={{ scale: [0.7, 1.4, 0.7] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.img
          src="/images/websites/home/hero/cloud.png"
          alt="Hero Image"
          className="w-[350px] h-[250px] object-cover z-10 absolute top-[80px] right-[0%]"
          style={{ transformOrigin: "top" }}
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <Image className='w-full sm:hidden object-fit h-[675px] absolute top-0 left-0' src={mobileHeroImage} alt="Hero Image" />
        <div className="absolute sm:left-[5%] top-[20%] md:top-[22%] max-[500px]:p-4 z-20 h-full breakpoint">
          <motion.h4
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className='text-[45px] font-lilita  leading-tight text-black'
          >
            The Maltina Nourishment Tour:
          </motion.h4>
          <motion.h4
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className='text-[25px] font-lilita mt-2 md:mt-0 text-black'
          >
            Inspiring Future Scientists Across Nigeria
          </motion.h4>
        </div>
      </header>
      <section className='relative z-10 max-[500px]:h-[3400px] max-[500px]:top-[130px] h-[1800px] bg-[#ff9e16]'>
        <Image className='w-full  object-fit max-[500px]:h-[3400px] h-[1800px] absolute top-0 left-0' src={landingPageImage} alt="Hero Image" />
        <section className='absolute max-[500px]:top-[1%] top-[2%] left-0 w-full'>
          <div className="breakpoint text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className='w-full font-lilita mx-auto text-4xl md:text-[60px] font-bold text-white'
            >
              Join The Maltina Nourishment Tour
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className='w-full mx-auto max-[500px]:my-3 font-poppins text-xl font-bold'
            >Together, we’re nourishing futures across Nigeria.</motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className='w-[80%] mt-3 font-poppins text-[#292526] mx-auto text-lg'
            >The Maltina Nourishment Tour is bringing back the excitement of science and
              discovery to schools across Nigeria. With our fun TV show, nationwide school
              roadshow, and hands on science challenges, we’re making learning enjoyable
              again and showing children that when both mind and body are nourished, they
              can achieve anything.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className='w-[80%] mt-4 font-poppins text-[#292526] mx-auto text-lg'
            >The Maltina Nourishment Tour is bringing back the excitement of science and
              All over Nigeria, we’re inspiring classrooms, fuelling lunchboxes, and sparking
              young imaginations with one clear message: Maltina is here to nourish the future.
            </motion.p>
          </div>
        </section>
        <section className='absolute max-[500px]:top-[25%] top-[25%] left-0 w-full'>
          <div className="breakpoint">
            <div className="md:w-[90%] mx-auto">
              <div className='p-8 md:p-12 bg-[#FBDA8F] w-full rounded-[3rem]'>
                <div className="flex flex-col items-center mb-8 md:mb-12">
                  <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className='font-poppins text-2xl md:text-2xl text-[#292526] mb-2'
                  >Children Reached</motion.p>
                  <div className='font-lilita text-[#1A1A1A] flex items-baseline gap-1'>
                    <span className='text-4xl md:text-6xl'><AnimatedNumber value={184000} /></span>
                    <span className='text-2xl md:text-4xl opacity-80'>/1,000,000</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {/* Progress Bar */}
                <div className="block w-full max-w-5xl mx-auto mb-16 relative">
                  {/* Line */}
                  <div className="h-1 md:h-2 bg-[#FF6F38] w-full absolute top-[5px] md:top-[9px] rounded-full z-0"></div>
                  {/* Dots */}
                  <div className="flex justify-between w-full relative z-10">
                    {['Start', '100k', '250k', '500k', '750k', '1M'].map((label, i) => (
                      <div key={label} className="flex flex-col items-center gap-1 md:gap-2">
                        <div className="w-3 h-3 md:w-6 md:h-6 bg-[#FF6F38] rounded-full ring-2 md:ring-4 ring-[#FBDA8F]"></div>
                        <span className="font-poppins text-[10px] md:text-sm font-medium text-[#292526]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex-1 transform hover:scale-105 transition-transform duration-300 relative"
                    >
                      <Image src={StatsCard1} alt="Schools Reached" className="w-full h-auto" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-white font-poppins text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2">Schools<br />Reached</p>
                        <p className="text-white font-lilita text-4xl md:text-6xl drop-shadow-md">
                          <AnimatedNumber value={24} />
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}

                      transition={{ delay: 0.2 }}
                      className="flex-1 transform hover:scale-105 transition-transform duration-300 relative"
                    >
                      <Image src={StatsCard2} alt="Teachers Engaged" className="w-full h-auto" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-white font-poppins text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2">Teachers<br />Engaged</p>
                        <p className="text-white font-lilita text-4xl md:text-6xl drop-shadow-md">
                          <AnimatedNumber value={4280} />
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}

                      transition={{ delay: 0.4 }}
                      className="flex-1 transform hover:scale-105 transition-transform duration-300 relative"
                    >
                      <Image src={StatsCard3} alt="States Engaged" className="w-full h-auto" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-white font-poppins text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2">States<br />Engaged</p>
                        <p className="text-white font-lilita text-4xl md:text-6xl drop-shadow-md">
                          <AnimatedNumber value={18} />
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className='w-full mt-5 md:mt-8 text-center font-lilita mx-auto text-3xl md:text-[50px] text-white'
            >
              How the Tour Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-12 w-full md:w-[95%] mx-auto pb-16">
              {/* Card 1 */}
              {/* Card 1 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}

                className="relative rotate-2 bg-[#FBDF0A] rounded-[3rem] p-8 max-[500px]:h-[300px] pt-12 text-center pb-2 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute inset-4 border-2 border-dashed border-[#FF6F38] rounded-[2.5rem] pointer-events-none"></div>
                <h3 className="font-lilita text-[#FF6F38] text-3xl md:text-4xl mb-4 leading-tight">Nominate<br />a School</h3>
                <p className="font-poppins text-[#292526] text-sm font-medium mb-3 relative z-10">
                  Know a school that can benefit from the Nourishment Tour?<br />
                  Submit a nomination and help us reach more students.
                </p>
                <button className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-[#FFB84C] text-[##F66F39] text-sm font-semibold px-10 py-4 rounded-full shadow-lg whitespace-nowrap border-2 border-[#E89515] hover:bg-[#FFC978] transition-colors z-20">
                  Nominate<br />a School
                </button>
              </motion.div>

              {/* Card 2 */}
              {/* Card 2 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}


                transition={{ delay: 0.2 }}
                className="relative max-[500px]:h-[300px] -rotate-2 bg-[#FBDF0A] rounded-[3rem] p-8 pt-12 text-center pb-16 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute inset-4 border-2 border-dashed border-[#FF6F38] rounded-[2.5rem] pointer-events-none"></div>
                <h3 className="font-lilita text-[#FF6F38] text-3xl md:text-4xl mb-4 leading-tight">Lunch Bag<br />Design<br />Challenge</h3>
                <p className="font-poppins text-[#292526] text-sm font-medium mb-3 relative z-10">
                  Join our creative competition! Design your lunch bag for a chance to win exciting prizes And inspire healthy eating habits
                </p>
                <button className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-[#FFB84C] text-[##F66F39] text-sm font-semibold px-10 py-4 rounded-full shadow-lg whitespace-nowrap border-2 border-[#E89515] hover:bg-[#FFC978] transition-colors z-20">
                  Submit a<br />design
                </button>
              </motion.div>

              {/* Card 3 */}
              {/* Card 3 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}

                transition={{ delay: 0.4 }}
                className="relative max-[500px]:h-[300px] rotate-2 bg-[#FBDF0A] rounded-[3rem] p-8 pt-12 text-center pb-2 transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute inset-4 border-2 border-dashed border-[#FF6F38] rounded-[2.5rem] pointer-events-none"></div>
                <h3 className="font-lilita text-[#FF6F38] text-3xl md:text-4xl mb-4 leading-tight">Track the<br />Impact</h3>
                <p className="font-poppins text-[#292526] text-sm font-medium mb-3 relative z-10">
                  See where the bus has been and how many children we’ve reached.
                </p>
                <button className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-[#FFB84C] text-[##F66F39] text-sm font-semibold px-10 py-4 rounded-full shadow-lg whitespace-nowrap border-2 border-[#E89515] hover:bg-[#FFC978] transition-colors z-20">
                  Open tour<br />tracker
                </button>
              </motion.div>
            </div>
            <div className='relative max-[500px]:hidden h-[250px]'>
              <Image src={swillImage} className='w-full md:w-[80%] max-[500px]:object-cover object-fit h-[150px] md:h-[250px] absolute top-[100px] sm:top-[-20px] left-0 sm:left-[5%] z-10' alt="Swill Image" />
              <Image src={mailtinaBottle} className='w-[250px] object-fit h-[250px] md:h-[250px] absolute top-0 right-10 z-1' alt="Mailtina Bottle" />
            </div>

          </div>
        </section>
      </section>
      <div className='relative z-10' style={{ backgroundImage: `url(${landingPageImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Image
          width={1000}
          height={170}
          src={'/images/websites/home/Group 17.png'}
          alt='bottle laptop'
          className='w-[100%] h-[450px]  object-fit  sm:hidden'
        />
      </div>
      <div className='py-8 max-[500px]:hidden relative z-10 text-center font-semibold bg-[#FFDF08]'>
        Sign up your child or their school to be part of the journey today
      </div>
    </div>
  )
}

export default page