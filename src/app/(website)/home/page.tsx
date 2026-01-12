'use client'
import HeroImage from '@/assets/images/landing-page/hero-image.png'
import Image from 'next/image'
import landingPageImage from '@/assets/images/landing-page/landing-page.png'
import { motion } from 'framer-motion'
import StatsCard1 from '@/assets/images/landing-page/Group 3.png'
import StatsCard2 from '@/assets/images/landing-page/Group 8.png'
import StatsCard3 from '@/assets/images/landing-page/Group 10.png'
import swillImage from '@/assets/images/landing-page/swirl.png'
import mailtinaBottle from '@/assets/images/landing-page/Clip path group.png'
import mobileHeroImage from '@/assets/images/landing-page/mobile-hero.png'

const page = () => {
  return (
    <div>
      <header className='relative z-10 bg-[#ff9e16] h-[500px] md:h-[700px]'>
        <Image className='w-full max-[500px]:hidden object-fit h-[800px] md:h-[1100px] min-[2500px]:h-[1500px] absolute top-0 left-0' src={HeroImage} alt="Hero Image" />
        <Image className='w-full sm:hidden object-fit h-[675px] md:h-[1100px] min-[2500px]:h-[1500px] absolute top-0 left-0' src={mobileHeroImage} alt="Hero Image" />
        <div className="relative max-[500px]:p-4 z-20 h-full breakpoint">
          <motion.h4
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className='text-[45px] font-lilita absolute  top-[15%] max-[500px]:w-[90%] max-[500px]:left-[5%] left-0 max-w-[600px] leading-tight text-black'
          >
            The Maltina Nourishment Tour:
          </motion.h4>
          <motion.h4
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0 }}
            className='text-[25px] max-[500px]:w-[90%] max-[500px]:left-[5%] max-[500px]:top-[36%] font-lilita mt-2 absolute md:top-[22%] left-0 text-black'
          >
            Inspiring Future Scientists Across Nigeria
          </motion.h4>
        </div>
      </header>
      <section className='relative z-1 max-[500px]:h-[4000px] h-[2500px] bg-[#ff9e16] max-[500px]:-mt-[200px] -mt-[480px]'>
        <Image className='w-full  object-fit max-[500px]:h-[4000px] h-[2500px] absolute top-0 left-0' src={landingPageImage} alt="Hero Image" />
        <section className='absolute max-[500px]:top-[10%] top-[26%] left-0 w-full'>
          <div className="breakpoint text-center">
            <h2 className='w-full font-lilita mx-auto text-4xl md:text-[60px] font-bold text-white'>
              Join The Maltina Nourishment Tour
            </h2>
            <p className='w-full mx-auto max-[500px]:my-3 font-poppins text-xl font-bold'>Together, we’re nourishing futures across Nigeria.</p>
            <p className='w-[80%] mt-3 font-poppins text-[#292526] mx-auto text-lg'>The Maltina Nourishment Tour is bringing back the excitement of science and
              discovery to schools across Nigeria. With our fun TV show, nationwide school
              roadshow, and hands on science challenges, we’re making learning enjoyable
              again and showing children that when both mind and body are nourished, they
              can achieve anything.
            </p>
            <p className='w-[80%] mt-4 font-poppins text-[#292526] mx-auto text-lg'>The Maltina Nourishment Tour is bringing back the excitement of science and
              All over Nigeria, we’re inspiring classrooms, fuelling lunchboxes, and sparking
              young imaginations with one clear message: Maltina is here to nourish the future.
            </p>
          </div>
        </section>
        <section className='absolute max-[500px]:top-[30%] top-[43%] left-0 w-full'>
          <div className="breakpoint">
            <div className="md:w-[90%] mx-auto">
              <div className='p-8 md:p-12 bg-[#FBDA8F] w-full rounded-[3rem]'>
                <div className="flex flex-col items-center mb-8 md:mb-12">
                  <p className='font-poppins text-2xl md:text-2xl text-[#292526] mb-2'>Children Reached</p>
                  <div className='font-lilita text-[#1A1A1A] flex items-baseline gap-1'>
                    <span className='text-5xl md:text-6xl'>184,000</span>
                    <span className='text-3xl md:text-4xl opacity-80'>/1,000,000</span>
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
                    <div className="flex-1 transform hover:scale-105 transition-transform duration-300 relative">
                      <Image src={StatsCard1} alt="Schools Reached" className="w-full h-auto" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-white font-poppins text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2">Schools<br />Reached</p>
                        <p className="text-white font-lilita text-4xl md:text-6xl drop-shadow-md">24</p>
                      </div>
                    </div>
                    <div className="flex-1 transform hover:scale-105 transition-transform duration-300 relative">
                      <Image src={StatsCard2} alt="Teachers Engaged" className="w-full h-auto" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-white font-poppins text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2">Teachers<br />Engaged</p>
                        <p className="text-white font-lilita text-4xl md:text-6xl drop-shadow-md">4280</p>
                      </div>
                    </div>
                    <div className="flex-1 transform hover:scale-105 transition-transform duration-300 relative">
                      <Image src={StatsCard3} alt="States Engaged" className="w-full h-auto" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <p className="text-white font-poppins text-lg md:text-xl font-bold leading-tight mb-1 md:mb-2">States<br />Engaged</p>
                        <p className="text-white font-lilita text-4xl md:text-6xl drop-shadow-md">18</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <h2 className='w-full mt-5 md:mt-8 text-center font-lilita mx-auto text-3xl md:text-[50px] text-white'>
              How the Tour Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-12 w-full md:w-[95%] mx-auto pb-16">
              {/* Card 1 */}
              <div className="relative rotate-2 bg-[#FBDF0A] rounded-[3rem] p-8 max-[500px]:h-[300px] pt-12 text-center pb-2 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-4 border-2 border-dashed border-[#FF6F38] rounded-[2.5rem] pointer-events-none"></div>
                <h3 className="font-lilita text-[#FF6F38] text-3xl md:text-4xl mb-4 leading-tight">Nominate<br />a School</h3>
                <p className="font-poppins text-[#292526] text-sm font-medium mb-3 relative z-10">
                  Know a school that can benefit from the Nourishment Tour?<br />
                  Submit a nomination and help us reach more students.
                </p>
                <button className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-[#FFB84C] text-[##F66F39] text-sm font-semibold px-10 py-4 rounded-full shadow-lg whitespace-nowrap border-2 border-[#E89515] hover:bg-[#FFC978] transition-colors z-20">
                  Nominate<br />a School
                </button>
              </div>

              {/* Card 2 */}
              <div className="relative max-[500px]:h-[300px] -rotate-2 bg-[#FBDF0A] rounded-[3rem] p-8 pt-12 text-center pb-16 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-4 border-2 border-dashed border-[#FF6F38] rounded-[2.5rem] pointer-events-none"></div>
                <h3 className="font-lilita text-[#FF6F38] text-3xl md:text-4xl mb-4 leading-tight">Lunch Bag<br />Design<br />Challenge</h3>
                <p className="font-poppins text-[#292526] text-sm font-medium mb-3 relative z-10">
                  Join our creative competition! Design your lunch bag for a chance to win exciting prizes And inspire healthy eating habits
                </p>
                <button className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-[#FFB84C] text-[##F66F39] text-sm font-semibold px-10 py-4 rounded-full shadow-lg whitespace-nowrap border-2 border-[#E89515] hover:bg-[#FFC978] transition-colors z-20">
                  Submit a<br />design
                </button>
              </div>

              {/* Card 3 */}
              <div className="relative max-[500px]:h-[300px] rotate-2 bg-[#FBDF0A] rounded-[3rem] p-8 pt-12 text-center pb-2 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-4 border-2 border-dashed border-[#FF6F38] rounded-[2.5rem] pointer-events-none"></div>
                <h3 className="font-lilita text-[#FF6F38] text-3xl md:text-4xl mb-4 leading-tight">Track the<br />Impact</h3>
                <p className="font-poppins text-[#292526] text-sm font-medium mb-3 relative z-10">
                  See where the bus has been and how many children we’ve reached.
                </p>
                <button className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 bg-[#FFB84C] text-[##F66F39] text-sm font-semibold px-10 py-4 rounded-full shadow-lg whitespace-nowrap border-2 border-[#E89515] hover:bg-[#FFC978] transition-colors z-20">
                  Open tour<br />tracker
                </button>
              </div>
            </div>
            <div className='relative max-[500px]:hidden h-[250px]'>
              <Image src={swillImage} className='w-full md:w-[80%] max-[500px]:object-cover object-fit h-[150px] md:h-[250px] absolute top-[100px] sm:top-5 left-0 sm:left-[5%] z-10' alt="Swill Image" />
              <Image src={mailtinaBottle} className='w-[250px] object-fit h-[250px] md:h-[250px] absolute top-0 right-10 z-1' alt="Mailtina Bottle" />
            </div>

          </div>
        </section>
      </section>
      <div style={{ backgroundImage: `url(${landingPageImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Image
          width={1000}
          height={170}
          src={'/images/websites/home/Group 17.png'}
          alt='bottle laptop'
          className='w-[100%] h-[410px]  object-fit  sm:hidden'
        />
      </div>
      <div className='py-8 max-[500px]:hidden relative text-center font-semibold bg-[#FFDF08] z-20'>
        Sign up your child or their school to be part of the journey today
      </div>
    </div>
  )
}

export default page