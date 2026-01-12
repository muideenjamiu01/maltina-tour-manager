import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import Image from "next/image"
import VotingEnded from "@/components/website/VotingEnded"

export default function VoteEnd() {
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
      {/* Header */}
      <Navbar />

      <VotingEnded />
     

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
