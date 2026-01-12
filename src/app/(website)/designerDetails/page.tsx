import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import Image from "next/image"
import DesignerDetailCard from "@/components/website/DesignerDetailCard"

export default function DesignerDetail() {
  return (
    <div className="relative min-h-screen">
         
       
         <Image
           src="/assets/background.png"
           alt="Vote background"
           fill
           priority
           className="object-cover"
         />
          <div className="relative z-10">
      <Navbar />

     <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">

          <DesignerDetailCard
            image="/assets/sampleperson.png" // match your screenshot image
            name="Blessing N."
            school="XYZ University"
            zone="Zone 1"
            location="Lagos, Nigeria"
            dateSubmitted="2024-05-15"
            description="This design showcases a bold visual identity inspired by modern aesthetics and cultural elements. It reflects creativity, balance, and attention to detail."
            votes={320}
          />

          {/* ABOUT VOTING (same spacing & width as screenshot) */}
          <div className="mt-10 ">
            <h2 className="font-bold text-black mb-2">
              About Voting
            </h2>
            <p className="text-sm text-black  font-semibold leading-relaxed">
              Voting allows you to support your favorite designers. Each vote
              contributes to the final ranking. You may only vote once per design,
              so choose wisely.
            </p>
            <p className="text-sm text-black  font-semibold leading-relaxed">
             One Vote Per Person: Each person can vote once per mobile number. Phone verification is required.
            </p>
            <p className="text-sm text-black font-semibold leading-relaxed">
             SMS Verification: You will receive a one-time code via SMS to verify your vote.
            </p>
            <p className="text-sm text-black font-semibold leading-relaxed">
             Fair Voting: Our system detects and prevents duplicate voting using email and mobile number validation.
            </p>
             <p className="text-sm text-black font-semibold leading-relaxed">
            Winner Selection: The design with the most votes at the end of the voting period will be featured on limited edition Maltina lunch bags distributed during the tour.
            </p>
             <p className="text-sm text-black font-semibold leading-relaxed">
             Voting Period: Voting is open until [End Date]. Results will be announced shortly after.
            </p>
             <p className="text-sm text-black font-semibold leading-relaxed">
             Fair Voting: Our system detects and prevents duplicate voting using email and mobile number validation.
            </p>
          </div>

        </div>
      </section>

      <Footer />
      </div>
      </div>
    
  )
}
