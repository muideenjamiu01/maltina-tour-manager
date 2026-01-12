import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import ConfirmVoteSection from "@/components/website/ConfirmVote"


import Image from "next/image"


export default function BeforeConfirming() {
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

      <ConfirmVoteSection />
     

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
