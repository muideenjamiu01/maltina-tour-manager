'use client'
import Footer from '@/components/website/layout/footer'
import Navbar from '@/components/website/layout/navbar'
import HeroImage from '@/assets/images/landing-page/hero-image.png'
import Image from 'next/image'
import landingPageImage from '@/assets/images/landing-page/landing-page.png'
import { motion } from 'framer-motion'

const page = () => {
  return (
    <div>
      <header className='relative z-10 bg-[#ff9e16] h-[700px]'>
        <Navbar transparent withLogo />
        <Image className='w-full object-fit h-[800px] md:h-[1100px] absolute top-0 left-0' src={HeroImage} alt="Hero Image" />
        <motion.h4
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className='text-[45px] absolute top-[15%] left-[5%] text-black'
        >
          The Maltina Nourishment Tour:
        </motion.h4>
        <motion.h4
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className='text-[25px] mt-2 absolute top-[22%] left-[5%] text-black'
        >
          Inspiring Future Scientists Across Nigeria
        </motion.h4>
      </header>
      <section className='relative z-1 h-[1500px] bg-[#ff9e16] -mt-[480px]'>
        <Image className='w-full object-fit h-[800px] md:h-[1500px] absolute top-0 left-0' src={landingPageImage} alt="Hero Image" />
        <section className='p-8 absolute top-[38%] left-0 w-full'>
          <h2 className='w-full mx-auto text-[60px] font-bold text-center text-white'>
            Join The Maltina Nourishment Tour
          </h2>
          <p className='w-full mx-auto font-poppins text-xl font-bold text-center'>Together, we’re nourishing futures across Nigeria.</p>
          <p className='w-[70%] mt-3 font-poppins text-[#292526] mx-auto text-lg text-center'>The Maltina Nourishment Tour is bringing back the excitement of science and
            discovery to schools across Nigeria. With our fun TV show, nationwide school
            roadshow, and hands on science challenges, we’re making learning enjoyable
            again and showing children that when both mind and body are nourished, they
            can achieve anything.
          </p>
          <p className='w-[70%] mt-4 font-poppins text-[#292526] mx-auto text-lg text-center'>The Maltina Nourishment Tour is bringing back the excitement of science and
            All over Nigeria, we’re inspiring classrooms, fuelling lunchboxes, and sparking
            young imaginations with one clear message: Maltina is here to nourish the future.
          </p>
        </section>
        <section className='p-8 absolute top-[65%] h-[945px]  left-0 w-full'>
          <div className='h-[445px] p-8 bg-[#FBDA8F] w-[80%] mx-auto rounded-lg'>
            <p className='w-full mx-auto font-poppins text-xl text-center'>Children Reached</p>
            <p className='w-full mx-auto font-poppins text-xl font-bold text-center'>
              <strong>184,000</strong> /
            </p>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  )
}

export default page